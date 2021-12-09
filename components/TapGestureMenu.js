import React from 'react';
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { cond, Easing, EasingNode, eq, Extrapolate, interpolate, interpolateNode, Value, debug, set, event, concat, or, block, call, Clock, startClock, stopClock } from 'react-native-reanimated';
import { runTiming } from './helper';
// import { AntDesign } from 'vect';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';


class TapGestureMenu extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Title", totalHeight: 100,
            states: Object.entries(State).reduce((acc, [key, val]) => ({ ...acc, [val]: key }), {})
        }

        const scale = new Value(1)
        const state = new Value(State.UNDETERMINED);
        const updated = new Value(1)
        const clock = new Clock()

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state,
                }
            }
        ]);

        this.scale = cond(eq(State.BEGAN, state),
            [
                set(scale, runTiming(scale, new Value(1.3), 100, null, clock)),
                scale,

            ],
            [
                set(scale, runTiming(scale, new Value(1), 100, null, clock)),
                scale
            ]
        )





    }

    onPress = () => {
        console.log("navigate", new Date())
    }

    render() {

        const { title, } = this.state

        const rotate = interpolateNode(this.height, {
            inputRange: [0, this.state.totalHeight],
            outputRange: [180, 0]
        })

        return (
            <GestureHandlerRootView style={{ paddingHorizontal: 20, paddingTop: 50 }} >
                <StatusBar backgroundColor="green" />
                {/* <ActivityIndicator color="black" /> */}


                <TapGestureHandler
                    // onHandlerStateChange={({ nativeEvent: { state } }) => console.log(state, this.state.states[state])}
                    onHandlerStateChange={this.onGestureEvent}
                >
                    <Animated.View style={styles.img} >
                        <Animated.Image source={require("../assets/1.jpg")} style={[{ width: "100%", height: "100%", transform: [{ scale: this.scale }] }]} />
                    </Animated.View>
                </TapGestureHandler>





            </GestureHandlerRootView>
        )
    }


}

const styles = StyleSheet.create({
    img: {
        width: "90%", height: 200, alignItems: "center", overflow: "hidden"
    }

});

export default TapGestureMenu