// import React from 'react';
// import { Image, StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
// import { RNCamera } from 'react-native-camera';
//
// const flashModeOrder = {
//   off: 'on',
//   on: 'auto',
//   auto: 'torch',
//   torch: 'off',
// };
// 
// const wbOrder = {
//   auto: 'sunny',
//   sunny: 'cloudy',
//   cloudy: 'shadow',
//   shadow: 'fluorescent',
//   fluorescent: 'incandescent',
//   incandescent: 'auto',
// };
//
// export default class TakePhoto extends React.Component {
//   constructor(props){
//     super(props)
//   }
//
//   state = {
//     flash: 'off',
//     zoom: 0,
//     type: 'back',
//     whiteBalance: 'auto',
//     photos: []
//   };
//
//   toggleFacing() {
//     this.setState({
//       type: this.state.type === 'back' ? 'front' : 'back',
//     });
//   }
//
//   toggleFlash() {
//     this.setState({
//       flash: flashModeOrder[this.state.flash],
//     });
//   }
//
//   toggleWB() {
//     this.setState({
//       whiteBalance: wbOrder[this.state.whiteBalance],
//     });
//   }
//
//   zoom(step) {
//     this.setState({
//       zoom: step
//     });
//   }
//
//   takePicture = async function() {
//     if (this.camera) {
//       const options = { width: 3200, base64: true, quality: 1 };
//       const data = await this.camera.takePictureAsync(options)
//       const { navigate } = this.props.navigation;
//       navigate("SendPhoto", {
//         screen: "SendPhoto",
//         imagedata: data.base64
//       });
//     }
//   };
//
//   render() {
//     return (
//       <RNCamera
//         ref={ref => {
//           this.camera = ref;
//         }}
//         style={{
//           flex: 1,
//         }}
//         type={this.state.type}
//         flashMode={this.state.flash}
//         zoom={this.state.zoom}
//         whiteBalance={this.state.whiteBalance}
//         ratio={'4:4'}
//         permissionDialogTitle={'Permission to use camera'}
//         permissionDialogMessage={'We need your permission to use your camera phone'}
//       >
//         <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
//             <Text style={styles.flipText}> Flip </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
//             <Text style={styles.flipText}> Flash: {this.state.flash} </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
//             <Text style={styles.flipText}> Colour: {this.state.whiteBalance} </Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//           }}
//         >
//           <Slider
//             style={{ width: 150, marginTop: 15, marginBottom: 10, alignSelf: 'flex-end' }}
//             onValueChange={this.zoom.bind(this)}
//             step={0.001}
//           />
//
//           <TouchableOpacity
//             style={{ alignSelf: 'flex-end'}}
//             onPress={this.takePicture.bind(this)}
//           >
//             <Image
//               source={require('../assets/cameraicon.png')}
//               style={styles.btnIcon}
//             />
//           </TouchableOpacity>
//         </View>
//       </RNCamera>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   navigation: {
//     flex: 1,
//   },
//   flipButton: {
//     flex: 0.3,
//     height: 30,
//     marginHorizontal: 2,
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     borderColor: 'white',
//     borderWidth: 1,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   flipText: {
//     color: 'white',
//     fontSize: 12,
//   },
//   picButton: {
//     borderColor: 'white',
//   },
//   btnIcon: {
//     height: 65,
//     width: 65,
//     marginBottom: 10,
//   },
// });
