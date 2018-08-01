import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Button, Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import SpeechAndroid from 'react-native-android-voice';
import Toast from 'react-native-easy-toast';
import { Jiro } from 'react-native-textinput-effects';
import prompt from 'react-native-prompt-android';
import DialogBox from 'react-native-dialogbox';

export default class SelectPhoto extends React.Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = {
    headerLeft: (
      <View/>
    ),
    headerTitle: (
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image source={require('../assets/navBarLogo.png')} style={{width:60, height:33, resizeMode:'contain'}}/>
      </View>
    ),
    headerRight: (
      <View/>
    ),
  };

  _navigate(name, type, data) {
    this.props.navigation.navigate(name, {
      screen: name,
      type: type,
      data: data
    });
  }

  // #1. open camera
  takePhoto() {
    ImagePicker.openCamera({
      includeBase64: true, includeExif: true, cropping: true, width: 3200, height: 3200, mediaType: "photo"
    }).then(image => {
      this._navigate("ShareFile", "photo", image.data);
    }).catch(error => { console.log(error) });
  }

  // #2. camera roll picker
  pickSingle() {
    ImagePicker.openPicker({
      includeBase64: true, includeExif: true, cropping: true, width: 3200, height: 3200, mediaType: "photo"
    }).then(image => {
      this._navigate("ShareFile", "photo", image.data);
    }).catch(error => { console.log(error) });
  }

  // #3. record
  async record(language) {
    try{
        var spokenText = await SpeechAndroid.startSpeech("Say anything now", SpeechAndroid[language]);
        this.refs.toast.show(spokenText, 2500, () => {
          this._navigate("ShareFile", "voice", spokenText);
        });
    } catch (error) {
        console.log("Please retry again.");
    }
  }

  selectLanguage() {
    this.dialogbox.pop({
      title: 'Select a Language',
      buttonFlow: 'row',
      btns: [
          {text: 'Eng', callback: () => { this.record('SINGAPORE'); }},
          {text: 'Chinese', callback: () => { this.record('CHINESE'); }},
          {text: 'Hindi', callback: () => { this.record('HINDI'); }},
          {text: 'Jap', callback: () => { this.record('JAPANESE'); }},
          {text: 'Korean', callback: () => { this.record('KOREAN'); }},
          {text: 'Thai', callback: () => { this.record('THAI'); }},
          {text: 'Viet', callback: () => { this.record('VIETNAMESE'); }}
      ]
    });
  }

  saveNote() {
    prompt(
      'Give your note a title',
      '',
      [{text: 'Cancel', style: 'cancel'},
       {text: 'OK', onPress: title => {
         AsyncStorage.setItem(title, this.state.noteMsg);
         this._navigate("Notes");
       }}],
      { cancelable: false, placeholder: '...' }
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} onScrollBeginDrag={Keyboard.dismiss}>
        <View style={styles.card1}>
          <Text style={styles.title}>Tap to Start & Swipe to Stop</Text>
          <Jiro
            // this is used as active and passive border color
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            multiline={true}
            height={Dimensions.get("window").height - 300}
            enablesReturnKeyAutomatically={true}
            onChangeText={(text) => this.setState({noteMsg: text}) }
            // onScroll={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => this.saveNote()}>
            <Text style={styles.Submit}> Submit </Text>
          </TouchableOpacity>

          <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>

          <Toast
            ref="toast"
            position='center'
            opacity={0.8}
            fadeOutDuration={1000}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.SquareStyle} onPress={() => this.takePhoto()}>
            <Image
              source={require('../assets/CameraIcon.png')}
              style={styles.SquareStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SquareStyle} onPress={() => this.pickSingle()}>
            <Image
              source={require('../assets/CameraRollIcon.png')}
              style={styles.SquareStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SquareStyle} onPress={() => this.selectLanguage()}>
            <Image
              source={require('../assets/RecordIcon.png')}
              style={styles.SquareStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SquareStyle} onPress={() => this._navigate("SketchJob")}>
            <Image
              source={require('../assets/DrawIcon.png')}
              style={styles.SquareStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SquareStyle} onPress={() => this._navigate("Notes")}>
            <Image
              source={require('../assets/NotesIcon.png')}
              style={styles.SquareStyle}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  SquareStyle: {
    height: 50, width: 50
  },
  card1: {
    paddingTop: 16,
    height: Dimensions.get("window").height-150,
  },
  title: {
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  TouchableOpacity: {
    alignItems: 'center',
    paddingTop: 10
  },
  Submit: {
    color: '#404d5b',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
