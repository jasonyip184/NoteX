import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

export default class Splash extends React.Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = {
    header: null
  }

  goHome(){
    const { navigation } = this.props;
    this.props.navigation.navigate("Home", {
      screen: "Home"
    });
  }

  render () {
      return (
        <View style={styles.container}>
          <VideoPlayer
              source={require('../assets/splash.mp4')}
              showOnStart={false}
              resizeMode={"stretch"}
              disablePlayPause={true}
              disableSeekbar={true}
              disableVolume={true}
              disableBack={true}
              disableFullscreen={true}
              disableTimer={true}
              onEnd={() => this.goHome()}
          />
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => this.goHome()}>
            <Text style={styles.Submit}>Skip</Text>
          </TouchableOpacity>
        </View>
      );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 100,
    left: 100,
    right: 100,
    bottom: 100
  },
  TouchableOpacity: {
    alignItems: 'center',
    padding: 10
  },
  Submit: {
    color: '#404d5b',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.8,
  },
})
