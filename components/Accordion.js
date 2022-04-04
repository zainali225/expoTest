import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
// import { AntDesign } from 'vect';
import { GestureHandlerRootView, State, TapGestureHandler, } from 'react-native-gesture-handler';
import Animated, { concat, cond, debug, eq, event, interpolateNode, set, Value, } from 'react-native-reanimated';
import { runTiming, sHeight } from '../services/helper';


class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Title", totalHeight: 100
        }

        const height = new Value(0)
        const state = new Value(-1);
        const newHeight = new Value(100)

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state,
                }
            }
        ]);
        this.setNewHeight = height => set(newHeight, height)

        this.height = cond(eq(State.END, state), [
            debug("total", newHeight),
            runTiming(height, cond(eq(height, 0), newHeight, 0), 500),
            height
        ], [
            height,
        ])


    }

    componentDidMount = () => {
        // const keys = Object.keys(this.viewRef)
        // // const node = this.viewRef.getNode()
        // setTimeout(() => {
        //     this.viewRef.measure((a, s, d, f, g) => {

        //         console.log(a, s, d, f, g)
        //     })
        // }, 1000);

    };



    render() {

        const { title, } = this.state

        const rotate = interpolateNode(this.height, {
            inputRange: [0, this.state.totalHeight],
            outputRange: [180, 0]
        })
 
        return (
            <GestureHandlerRootView style={{ paddingHorizontal: 20, paddingTop: sHeight }} >
                <StatusBar backgroundColor="green" />
                <ActivityIndicator color="black" />


                <TapGestureHandler onHandlerStateChange={this.onGestureEvent}   >
                    <Animated.View style={{ flexDirection: "row", height: 40, backgroundColor: "cyan", alignItems: "center", justifyContent: "space-between" }} >
                        <Text>{title}</Text>
                        <Animated.Text style={{ transform: [{ rotate: concat(rotate, "deg") }] }} >
                            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
                        </Animated.Text>
                    </Animated.View>
                </TapGestureHandler>

                <Animated.View
                    ref={ref => this.viewRef = ref}
                    onLayout={({ nativeEvent: { layout } }) => layout.height > this.state.totalHeight && this.setNewHeight(layout.height)}
                    style={{ height: this.height, borderBottomWidth: 1, backgroundColor: "teal" }} >
                    {
                        this.props.children
                    }
                </Animated.View> 


            </GestureHandlerRootView >
        )
    }


}


export default Accordion