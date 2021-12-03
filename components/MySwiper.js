import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug, Clock, greaterOrEq, lessOrEq, and, or, greaterThan, stopClock, divide, abs, ceil, multiply, floor, concat, startClock } from 'react-native-reanimated';
import { wp, hp, runSpring, runTiming } from './helper'


const assets = [
    "https://4kwallpapers.com/images/walls/thumbs_3t/1540.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1506.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1501.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1615.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/1605.jpg",
]
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
                stopClock(clock),
                set(translationX, add(translationX, offsetX)),
                cond(and(lessOrEq(translationX, 0), greaterThan(translationX, MAX)), [
                ], [
                    cond(lessOrEq(translationX, 0), [
                        MAX
                    ], [
                        0
                    ])
                ]),
                translationX
            ],
            [
                cond(eq(State.END, state),
                    [
                        set(anim, multiply(add(ceil(divide(translationX, wp(100))), 1), -wp(100))),
                        set(offsetX, anim),
                        // runSpring(clock, offsetX, velocityX, new Value(0)),
                        runTiming(translationX, anim, 300, null, clock),
                        
                        debug("trans|", anim),

                        cond(and(lessOrEq(offsetX, 0), greaterThan(offsetX, MAX)), 0, [
                            cond(lessOrEq(offsetX, 0), [
                                set(offsetX, MAX)
                            ], [
                                set(offsetX, 0)
                            ]),
                        ]),
                        translationX,
                    ],
                    translationX,
                ),

                // set(state, State.UNDETERMINED),
            ],


        );


    }


    render() {

        const { states } = this.state
        // console.log(snapPoints,wp(100))

        return (

            <GestureHandlerRootView   >


                <PanGestureHandler
                    onGestureEvent={this.onGestureEvent}
                    onHandlerStateChange={this.onGestureEvent}
                // onGestureEvent={({ nativeEvent: { state } }) => console.log(states[state])}
                // onHandlerStateChange={({ nativeEvent: { state } }) => console.log(states[state])}
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