// @ts-nocheck
import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import Animated, { add, Clock, concat, cond, debug, divide, eq, event, greaterThan, lessThan, multiply, or, set, stopClock, useAnimatedGestureHandler, Value } from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { runTiming } from '../services/helper';
const ITEM_SIZE = 30



const Picker = ({ data = [], width = "100%" }) => {
    const MAX_HEIGHT = -data.length * ITEM_SIZE 

    const offsetY = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const positionY = new Value(0);
    const velocityY = new Value(0)
    const translationY = new Value(0);
    const clock = new Clock();
    const onGestureEvent = ({ nativeEvent: { y, state: s, translationY: tY, velocityY: vY } }) => {
        positionY.setValue(y)
        state.setValue(s)
        translationY.setValue(tY)
        velocityY.setValue(vY)
    }

    const translateY = cond(
        eq(state, State.ACTIVE),
        [
            set(offsetY, add(translationY, offsetY)),
            cond(or(lessThan(offsetY, MAX_HEIGHT), greaterThan(offsetY, 0)), set(offsetY, 0),
                [
                    set(offsetY, cond(greaterThan(offsetY, 0), 0, MAX_HEIGHT))
                ]),
            // cond(eq(lessThan(offsetY, 0)), set(offsetY, 0),offsetY),
            // debug("translationY", translationY),
            debug("translationY", concat(translationY,"|" ,)),
            offsetY,

        ],
        [
            // cond(eq(State.END, state),
            //     [
            //         set(anim, multiply(add(divide(offsetY, WIDTH), cond(greaterThan(velocityX, 0), 1, -1)), WIDTH)),

            set(offsetY, translationY),
            // cond(or(lessThan(offsetY, MAX_HEIGHT), greaterThan(offsetY, 0)), set(offsetY, 0),
            //     [
            //         // set(offsetY, cond(greaterThan(offsetY, 0), 0, MAX_HEIGHT))
            //     ]),

            //     ]),

            offsetY,
        ]);


    return (
        <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            onGestureEvent={onGestureEvent}
        >
            <View style={{ overflow: "scroll", height: ITEM_SIZE * 5, width }} >
                <Animated.View style={{ transform: [{ translateY }] }}  >
                    {
                        data.map((_, ind) =>
                            <Text style={{ height: ITEM_SIZE }} key={ind} >{ind}</Text>
                        )
                    }
                </Animated.View>
            </View>
        </PanGestureHandler>
    );
};

export default Picker;
