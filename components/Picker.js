

import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from "react-native-gesture-handler";
import Animated, { abs, add, call, Clock, concat, cond, debug, divide, eq, event, Extrapolate, greaterThan, interpolateNode, lessThan, modulo, multiply, neq, not, or, round, set, startClock, stopClock, sub, Value } from 'react-native-reanimated';


const ITEM_SIZE = 40


class Picker extends Component {

    constructor(props) {
        super(props)

        this.OFFSETS = props.data.map((t, ind) => (ind * ITEM_SIZE) + ITEM_SIZE * 2)

        const { data, onValueChange } = props

        this.scrollState = new Value(State.UNDETERMINED)
        this.scroll = 0


    };

    onScroll = (offset,) => {
        this.scroll = offset

    };

    onEnd = () => {
        console.log('onEnd: ', Math.random());
        // const index = parseInt(this.scroll / ITEM_SIZE)
        // this.scrollRef.scrollToIndex({ index })
    };

    scrollToIndex = (index) => {
        this.scrollRef.scrollToIndex({ index })
    };





    render() {

        let { data = [], width = "100%", selectedValue, onValueChange } = this.props

        data = ["", "", ...data, "", ""]
        return (
            <Animated.View style={{ overflow: "hidden", height: ITEM_SIZE * 5, width, backgroundColor: "cyan" }} >

                <Animated.View style={styles.selectedIndex} />

                <FlatList keyExtractor={i => String(Math.random())}
                    ref={ref => this.scrollRef = ref}
                    onScroll={e => this.onScroll(e.nativeEvent.contentOffset.y,)}
                    // onMomentumScrollEnd={e => this.onEnd(e.nativeEvent.contentOffset.y, State.END)}
                    // onMomentumScrollEnd={this.onEnd}
                    snapToOffsets={this.OFFSETS}
                    // onTouchEndCapture={this.onEnd}

                    data={data}
                    renderItem={({ item: val, index: i }) => <TouchableOpacity activeOpacity={1} onPress={() => this.scrollToIndex(i - 2)} key={val} style={{ height: ITEM_SIZE, backgroundColor: "teal", alignItems: "center", justifyContent: "center", }}>
                        <Text children={val} style={{ backgroundColor: "red", }} />
                    </TouchableOpacity>
                    }
                />

            </Animated.View>
        )
    }


}



export default Picker;

const styles = {
    selectedIndex: {
        // height: ITEM_SIZE, top: ITEM_SIZE * 2, borderRadius: 5, width: "100%",
        // backgroundColor: "rgba(0,0,0,0.5)", position: "absolute",
        height: ITEM_SIZE, top: ITEM_SIZE * 2, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, width: "100%",
        position: "absolute", zIndex: 12,
    }
}