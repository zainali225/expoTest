import { Dimensions } from "react-native";
import { clockRunning, debug, Value, set, startClock, cond, stopClock, spring, Easing, block, timing, EasingNode, Clock } from "react-native-reanimated";


const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width



export function wp(float) {
    return WIDTH * float / 100
}
export function hp(float) {
    return HEIGHT * float / 100
}

export function runSpring(clock, value, velocity, dest, damping) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        damping: damping || 10,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, velocity),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ];
}

export function runTiming(value, dest, duration, clock) {
    const state = {
        finished: new Value(0),
        position: value,
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: duration || 1000,
        toValue: dest,
        easing: EasingNode.linear,
    };
    clock = clock || new Clock()

    return block([
        cond(clockRunning(clock), 0, [
            // If the clock isn't running we reset all the animation params and start the clock
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, stopClock(clock)),
        // we made the block return the updated position
        state.position,
    ]);
}