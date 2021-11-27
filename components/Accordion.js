import React from 'react';
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { cond, Easing, EasingNode, eq, Extrapolate, interpolate, interpolateNode, Value, debug, set, event, concat } from 'react-native-reanimated';
import { runTiming } from './helper';
// import { AntDesign } from 'vect';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';


class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Title", totalHeight: 100
        }

        const height = new Value(0)
        const state = new Value(-1);
        const updated = new Value(0)

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state,
                }
            }
        ]);

        this.height = cond(eq(State.BEGAN, state), [
            set(updated, cond(eq(height, 0), this.state.totalHeight, 0)),
            height
        ], [
            set(height, runTiming(height, updated, 500)),
            height,
        ])


    }


    render() {

        const { title, } = this.state

        const rotate = interpolateNode(this.height, {
            inputRange: [0, this.state.totalHeight],
            outputRange: [180, 0]
        })

        // console.log(this.state.totalHeight, "---")

        return (
            <GestureHandlerRootView style={{ paddingHorizontal: 20 }} >
                <StatusBar backgroundColor="green" />
                <ActivityIndicator color="black" />


                <TapGestureHandler
                    // onHandlerStateChange={e => console.log(e.nativeEvent.state)}
                    onHandlerStateChange={this.onGestureEvent}
                >
                    <Animated.View style={{ flexDirection: "row", height: 40, backgroundColor: "cyan", alignItems: "center", justifyContent: "space-between" }} >
                        <Text>{title}</Text>
                        <Animated.Text style={{ transform: [{ rotate: concat(rotate, "deg") }] }} >
                            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
                        </Animated.Text>
                    </Animated.View>
                </TapGestureHandler>

                <Animated.View
                    ref={ref => this.viewRef = ref}
                    renderToHardwareTextureAndroid style={{ height: this.height, borderBottomWidth: 1 }} >
                    {
                        Array(10).fill().map((_, key) =>
                            <Text {...{ key }} >{++key}</Text>
                        )
                    }
                </Animated.View>



            </GestureHandlerRootView>
        )
    }


}


export default Accordion