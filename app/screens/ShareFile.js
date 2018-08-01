import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Clipboard, ToastAndroid, Platform } from 'react-native';
import base64 from 'base-64';
import axios from 'axios';
import Share, { ShareSheet, Button } from 'react-native-share';
import prompt from 'react-native-prompt-android';

export default class ShareFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loadingDone: false
    }
  }

  static navigationOptions = {
    headerTitle: (
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image source={require('../assets/navBarLogo.png')} style={{width:60, height:33}}/>
      </View>
    ),
    headerRight: (
      <View/>
    ),
  };

  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'Data cannot be retrieved');
    const type = navigation.getParam('type', 'Type cannot be retrieved');
    if(type == "photo") {
      this.sendPhoto(data);
    } else {
      this.setState({sentence: data});
      this.setState({loadingDone:true});
    }
  }

  sendPhoto = (image_data) => {
    // Takes image data to send to API
    // convert base64 to binary array
    var binary = base64.decode(image_data);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    var arrayBuffer = new Uint8Array(array);;
    // POST request to recognizeText API with binary array
    axios({
      method: 'post',
      url: 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/recognizeText?handwriting=true',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '28673333baf14cf5b09953a43c4b1f29'
      },
      data: arrayBuffer
    })
    .then(response => {
      var jsonObj = JSON.parse(JSON.stringify(response.headers));
      var queryUrl = jsonObj['operation-location'];
      new Promise(resolve => setTimeout(() => resolve(this.sendPhoto2(queryUrl)), 3000));
    })
    .catch(error => {
      Alert.alert('Handwriting Not Recognized', 'Please try another photo.');
      console.log(error);
    });
  }

  // Take result from POST to make GET
  sendPhoto2 = (query_url) => {
    axios({
        method: 'get',
        url: query_url,
        headers: {
          'Ocp-Apim-Subscription-Key': '28673333baf14cf5b09953a43c4b1f29'
        }
    })
    .then(response => {
      var jsonData = response.data.recognitionResult.lines;
      this.parseJson(jsonData);
    })
    .catch(error =>  {
      Alert.alert('Connection Error', 'Please try again.');
      console.log(error);
    });
  }

  // Tidy result from API call and send for sharing
  parseJson = (json_data) => {
    // append all to single string
    var data = json_data;
    var sentence = "";
    for(var i in data) {
      sentence = sentence + data[i].text + ", ";
    }
    this.setState({sentence: sentence});
    this.setState({loadingDone:true});
  }

  onCancel() {
    console.log("CANCEL")
    this.setState({visible:false});
  }

  onOpen() {
    console.log("OPEN")
    this.setState({visible:true});
  }

  addNote() {
    prompt(
      'Give your note a title',
      '',
      [{text: 'Cancel', style: 'cancel'},
       {text: 'OK', onPress: title => {
         AsyncStorage.setItem(title, this.state.sentence);
         this.props.navigation.navigate("Notes", {
           screen: "Notes"
         });
       }}],
      { cancelable: false, placeholder: '...' }
    );
  }

  render() {
    if(this.state.loadingDone) {
      let shareOptions = {
        title: "Share",
        message: this.state.sentence,
        url: ""
      };

      return (
        <View style={styles.container}>
          <Text style={styles.title1}> Your note is ready! </Text>
          <View style={styles.horizontal}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => Share.open(shareOptions)}>
              <Image
                source={require('../assets/ShareIcon.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.title2}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.addNote()}>
              <Image
                source={require('../assets/NotesIcon.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.title2}>Save to Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
  title1: {
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.8,
    marginBottom: 30,
  },
  title2: {
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20
  },
  iconStyle: {
    height: 65, width: 65
  },
  buttonStyle: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
});
