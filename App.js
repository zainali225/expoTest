import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Picker from './components/Picker';
import SharedElement from './components/SharedElement';
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


    return <SharedElement  />
    // return (
    //   <View style={{ flex: 1, paddingTop: 100 }} >
    //     <StatusBar style="auto" backgroundColor='green' />
    //     <Picker data={Array(20).fill(null).map((_, i) => i)} />
    //   </View>
    // )
    // return <Accordion  >
    //   {
    //     Array(10).fill().map((_, key) =>
    //       <Text {...{ key }} >{++key}</Text>
    //     )
    //   }
    // </Accordion>

    // return <MySwiper />

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