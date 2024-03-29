import React from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';

const DragAndSnap = () => {
    const translation = {
        x: useSharedValue(0),
        y: useSharedValue(0),
    };

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translation.x.value;
            ctx.startY = translation.y.value;
        },
        onActive: (event, ctx) => {
            translation.x.value = ctx.startX + event.translationX;
            translation.y.value = ctx.startY + event.translationY;
        },
        onEnd: (_) => {
            translation.x.value = withSpring(0);
            translation.y.value = withSpring(0);
        },
    });

    const stylez = useAnimatedStyle(() => {
        const H = Math.round(
            interpolate(translation.x.value, [0, 300], [0, 360], Extrapolate.CLAMP)
        );
        const S = Math.round(
            interpolate(translation.y.value, [0, 500], [100, 50], Extrapolate.CLAMP)
        );
        const backgroundColor = `hsl(${H},${S}%,50%)`;
        return {
            transform: [
                {
                    translateX: translation.x.value,
                },
                {
                    translateY: translation.y.value,
                },
            ],
            backgroundColor,
        };
    });

    return (
        <GestureHandlerRootView style={{ flex: 1, margin: 50 }}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        {
                            width: 40,
                            height: 40,
                        },
                        stylez,
                    ]}
                />
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

export default DragAndSnap;