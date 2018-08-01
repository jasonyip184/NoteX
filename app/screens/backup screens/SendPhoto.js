// import React, { Component } from 'react';
// import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import base64 from 'base-64';
// import axios from 'axios';
// import { Bars } from 'react-native-loader';
//
// export default class SendPhoto extends React.Component {
//
//   constructor(props){
//     super(props)
//     this.state = {
//       loadingDone: false
//     }
//   }
//
//   static navigationOptions = {
//     headerTitle: (
//       <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
//           <Image source={require('../assets/navBarLogo.png')} style={{width:60, height:33}}/>
//       </View>
//     ),
//     headerRight: (
//       <View/>
//     ),
//   };
//
//   componentDidMount() {
//     const { navigation } = this.props;
//     const imagedata = navigation.getParam('data', 'Photo data cannot be sent');
//     this.sendPhoto(imagedata);
//   }
//
//   sendPhoto = (image_data) => {
//     // Takes image data to send to API
//     // convert base64 to binary array
//     var binary = base64.decode(image_data);
//     var array = [];
//     for(var i = 0; i < binary.length; i++) {
//         array.push(binary.charCodeAt(i));
//     }
//     var arrayBuffer = new Uint8Array(array);;
//     // POST request to recognizeText API with binary array
//     axios({
//       method: 'post',
//       url: 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/recognizeText?handwriting=true',
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Ocp-Apim-Subscription-Key': '99d5d2e7aa7b4af2963fa01ef8f63ccc'
//       },
//       data: arrayBuffer
//     })
//     .then(response => {
//       var jsonObj = JSON.parse(JSON.stringify(response.headers));
//       var queryUrl = jsonObj['operation-location'];
//       new Promise(resolve => setTimeout(() => resolve(this.sendPhoto2(queryUrl)), 3000));
//     })
//     .catch(error => {
//       Alert.alert('Handwriting Not Recognized', 'Please try another photo.');
//       console.log(error);
//     });
//   }
//
//   // Take result from POST to make GET
//   sendPhoto2 = (query_url) => {
//     axios({
//         method: 'get',
//         url: query_url,
//         headers: {
//           'Ocp-Apim-Subscription-Key': '99d5d2e7aa7b4af2963fa01ef8f63ccc'
//         }
//     })
//     .then(response => {
//       var jsonData = response.data.recognitionResult.lines;
//       this.parseJson(jsonData);
//     })
//     .catch(error =>  {
//       Alert.alert('Connection Error', 'Please try again.');
//       console.log(error);
//     });
//   }
//
//   // Tidy result from API call and send for sharing
//   parseJson = (json_data) => {
//     // append all to single string
//     var data = json_data;
//     var sentence = "";
//     for(var i in data) {
//       sentence = sentence + data[i].text + ", ";
//     }
//
//     const { navigate } = this.props.navigation;
//     this.setState({loadingDone:true});
//     navigate("ShareFile", {
//       screen: "ShareFile",
//       msg: sentence
//     });
//   }
//
//   render() {
//     if(!this.state.loadingDone) {
//       return (
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Bars size={30}/>
//         </View>
//       );
//     }
//     return(null);
//   }
// }
