import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Accordion from './components/Accordion';
import DragDrop from './components/DragDrop';
import MySwiper from './components/MySwiper';
import TapGestureMenu from './components/TapGestureMenu';
// import ImageAnim from './zainTest/ImageAnim';

class App extends Component {

  state = {
    input: "",
    names: ["Ali"]
  }

  addName = () => {
    this.setState({ names: this.state.names.concat(this.state.input) })
  }

  render() {

    return <MySwiper />

    return (
      <View style={{ flex: 1, alignItems: "center", paddingTop: getStatusBarHeight(), backgroundColor: "#efefef" }}>
        <StatusBar style="auto" />

        <TextInput value={this.state.input} onChangeText={(value) => { this.setState({ input: value }) }} placeholder="Enter name" style={{ width: "100%", height: 40, borderWidth: 1, padding: 5, margin: 5 }} />
        <TouchableOpacity onPress={() => { this.addName() }}
          style={{ width: "60%", height: 40, backgroundColor: "cyan", alignItems: "center", justifyContent: "center", borderRadius: 20 }}
        >
          <Text>Add name</Text>
        </TouchableOpacity>
        {
          this.state.names.map((txt, index) => (
            <View key={index} style={{ flexDirection: "row", backgroundColor: "lightblue", width: "100%", height: 30, marginVertical: 5, justifyContent: "space-between", paddingHorizontal: 10 }}>
              <Text  >{txt}</Text>
              <Text>X</Text>
            </View>
          ))
        }
      </View>
    );
  }
}

export default App