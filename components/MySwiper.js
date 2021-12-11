import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image, StatusBar } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug, Clock, greaterOrEq, lessOrEq, and, or, greaterThan, stopClock, divide, abs, ceil, multiply, floor, concat, startClock } from 'react-native-reanimated';
import { wp, hp, runSpring, runTiming } from './helper'


const assets = [
    "https://4kwallpapers.com/images/walls/thumbs_3t/1521.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1540.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1506.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1501.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1522.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1523.jpg",
]
const WIDTH = wp(100)
const snapPoints = assets.map((_, index) => index * -wp(100))
const MIN = 0
const MAX = -(assets.length - 1) * wp(100)

class MySwiper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            states: Object.entries(State).reduce((acc, [key, val]) => ({ ...acc, [val]: key }), {})
        }

        const offsetX = new Value(0);
        const state = new Value(State.UNDETERMINED);
        const positionX = new Value(0);
        const velocityX = new Value(0)
        const translationX = new Value(0);
        const clock = new Clock();
        const anim = new Value(0)

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    x: positionX,
                    state,
                    translationX,
                    velocityX
                    // x: offsetX,
                }
            }
        ]);

        this.translateX = cond(
            eq(state, State.ACTIVE),
            [
                // stopClock(clock),
                set(translationX, add(translationX, offsetX)),

                translationX,
                debug("anim|offset|state ", concat(anim, "|", offsetX, "|", state)),

            ],
            [
                cond(eq(State.END, state),
                    [
                        set(anim, multiply(add(divide(offsetX, WIDTH), cond(greaterThan(velocityX, 0), 1, -1)), WIDTH)),

                        set(offsetX, runTiming(offsetX, anim, 200, clock)),
                        
                    ]),

                offsetX,
            ]);


    }


    render() {

        const { states } = this.state

        return (

            <GestureHandlerRootView   >
                <StatusBar backgroundColor="green" />

                <PanGestureHandler
                    onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent}
                // onGestureEvent={({ nativeEvent: { state } }) => console.log(states[state])} onHandlerStateChange={({ nativeEvent: { state } }) => console.log(states[state])}
                >

                    <Animated.View
                        style={{
                            flexDirection: "row",
                            width: wp(100) * assets.length,
                            transform: [{ translateX: this.translateX }]
                        }}
                    >
                        {
                            assets.map(uri => <Image  //resizeMode="contain"
                                style={styles.image} source={{ uri }} key={uri} />)
                        }

                    </Animated.View>

                </PanGestureHandler>

            </GestureHandlerRootView>
        );
    };
}

export default MySwiper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: wp(100), height: hp(100),
    }
});