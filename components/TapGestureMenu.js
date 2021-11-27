import React from 'react';
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { cond, Easing, EasingNode, eq, Extrapolate, interpolate, interpolateNode, Value, debug, set, event, concat } from 'react-native-reanimated';
import { runTiming } from './helper';
// import { AntDesign } from 'vect';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';


class TapGestureMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Title", totalHeight: 100
        }

        const scale = new Value(1)
        const state = new Value(State.UNDETERMINED);
        const updated = new Value(1)

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state,
                }
            }
        ]);

        this.scale = cond(eq(State.BEGAN, state), [
            set(scale, runTiming(scale, new Value(1.5),)),
            scale
        ], [
            cond(eq(State.FAILED, state), [
                set(scale, runTiming(scale, new Value(1.5),)),

            ], [
                set(scale, runTiming(scale, new Value(1),)),

            ]),
            scale
        ])


    }


    render() {

        const { title, } = this.state

        const rotate = interpolateNode(this.height, {
            inputRange: [0, this.state.totalHeight],
            outputRange: [180, 0]
        })

        return (
            <GestureHandlerRootView style={{ paddingHorizontal: 20 }} >
                <StatusBar backgroundColor="green" />
                <ActivityIndicator color="black" />


                <TapGestureHandler
                    onHandlerStateChange={e => console.log(e.nativeEvent.state)}
                    onEnded={val=>console.log("ended")}
                    // onHandlerStateChange={this.onGestureEvent}
                >
                    <Animated.Image source={require("../assets/1.jpg")} style={[styles.img, { transform: [{ scale: this.scale }] }]} />

                </TapGestureHandler>





            </GestureHandlerRootView>
        )
    }


}

const styles = StyleSheet.create({
    img: {
        width: "90%", height: 100, alignSelf: "center"
    }

});

export default TapGestureMenu