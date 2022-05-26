// @ts-nocheck
import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import Animated, { add, Clock, concat, cond, debug, divide, eq, event, greaterThan, lessThan, multiply, or, set, stopClock, sub, useAnimatedGestureHandler, Value } from 'react-native-reanimated';
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { runSpring, runTiming } from '../services/helper';
const ITEM_SIZE = 30



const Picker = ({ data = [], width = "100%" }) => {
    const MAX_HEIGHT = (data.length - 3) * ITEM_SIZE
    const MIN_HEIGHT = ITEM_SIZE * 2
    console.log('offset: ', "[" + -MAX_HEIGHT + " < x < " + MIN_HEIGHT + "]");

    const offsetY = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const transY = new Value(MIN_HEIGHT)
    const velocityY = new Value(0)
    const translationY = new Value(0);
    const clock = new Clock();
    const onGestureEvent = event([{
        nativeEvent: {
            velocityY,
            state,
            translationY
        }
    }])
    // const onGestureEvent = ({ nativeEvent: { y, state: s, translationY: tY, velocityY: vY } }) => {
    //     positionY.setValue(y)
    //     state.setValue(s)
    //     translationY.setValue(tY)
    //     velocityY.setValue(vY)
    // }

    const translateY = cond(
        eq(state, State.ACTIVE),
        [
            stopClock(clock),
            set(transY, add(translationY, offsetY)),
            cond(or(lessThan(transY, -MAX_HEIGHT), greaterThan(transY, MIN_HEIGHT)),
                [
                    set(transY, cond(greaterThan(transY, MIN_HEIGHT), MIN_HEIGHT, -MAX_HEIGHT)),
                ]),
            transY,

        ],
        [
            cond(eq(State.END, state),
                [
                    cond(greaterThan(velocityY, 0), [
                        set(transY, runSpring(clock, transY, velocityY, add(transY, ITEM_SIZE), 20)),
                    ], [
                        set(transY, runSpring(clock, transY, velocityY, sub(transY, ITEM_SIZE), 20)),

                    ]),
                    cond(or(lessThan(velocityY, -MAX_HEIGHT), greaterThan(velocityY, MIN_HEIGHT)),
                        [
                            set(transY, cond(greaterThan(transY, MIN_HEIGHT), MIN_HEIGHT, -MAX_HEIGHT)),
                        ]),

                ]),
            set(offsetY, transY),
            transY,
        ]);


    return (
        <PanGestureHandler
            // onHandlerStateChange={e => console.log(e.nativeEvent.velocityY)}
            // onGestureEvent={e => console.log(e.nativeEvent.velocityY)}
            onHandlerStateChange={onGestureEvent}
            onGestureEvent={onGestureEvent}
        >
            <Animated.View style={{ overflow: "scroll", height: ITEM_SIZE * 5, width }} >

                <View style={{ height: ITEM_SIZE, top: ITEM_SIZE * 2, width: "100%", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute" }} />
                <Animated.View style={{ transform: [{ translateY }] }}  >
                    {
                        data.map(ind =>
                            <Text style={{ height: ITEM_SIZE }} key={ind} >{ind}</Text>
                        )
                    }
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default Picker;
