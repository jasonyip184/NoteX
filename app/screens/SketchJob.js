import React, { Component } from 'react';
import { CameraRoll, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import Toast from 'react-native-easy-toast';

export default class SketchJob extends Component {

  static navigationOptions = {
    headerTitle: (
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <Image source={require('../assets/navBarLogo.png')} style={{width:60, height:33, resizeMode:'contain'}}/>
      </View>
    ),
    headerRight: (
      <View/>
    ),
  };

  render() {
      return (
        <View style={{ flex: 1 }}>
              <Text style={styles.title}>Draw</Text>
              <SignatureCapture
                  style={[{flex:1},styles.signature]}
                  ref="sign"
                  onSaveEvent={this._onSaveEvent}
                  onDragEvent={this._onDragEvent}
                  saveImageFileInExtStorage={true}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode={"portrait"}/>

              <Toast
                ref="toast"
                position='top'
                opacity={0.8}
                fadeOutDuration={2000}
              />

              <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                  <TouchableOpacity style={styles.buttonStyle}
                      onPress={() => {
                        this.refs["sign"].saveImage()
                        this.refs.toast.show('Drawing has been saved into Camera Roll', 2000);
                      } } >
                      <Text>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonStyle}
                      onPress={() => { this.refs["sign"].resetImage() } } >
                      <Text>Reset</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  }

  _onSaveEvent(result) {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      CameraRoll.saveToCameraRoll(result.pathName);
  }

}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    title: {
      textAlign: 'center',
      color: '#404d5b',
      fontSize: 30,
      fontWeight: 'bold',
      backgroundColor: "white"
    },
});
