import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import Toast from 'react-native-easy-toast';
import Share, { ShareSheet, Button } from 'react-native-share';

export default class EditNote extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      touched: false
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

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Title cannot be retrieved');
    const msg = navigation.getParam('msg', 'Msg cannot be retrieved');

    let shareOptions = {
      title: "Share",
      message: msg,
      url: ""
    };

    return (
      <ScrollView style={{ flex: 1 }} onScrollBeginDrag={Keyboard.dismiss}>
        <View style={styles.card1}>
          <Text style={styles.title}>{title}</Text>

          <Jiro
            borderColor={'#64c29c'}
            inputStyle={{ color: 'grey' }}
            multiline={true}
            height={Dimensions.get("window").height - 300}
            enablesReturnKeyAutomatically={true}
            defaultValue={msg}
            onChangeText={(text) => this.setState({noteMsg: text, touched: true}) }
          />

          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {
            if(this.state.touched) {
              AsyncStorage.setItem(title, this.state.noteMsg)
              this.refs.toast.show("Changes have been made", 10, () => {
                this.props.navigation.navigate("Home", {
                  screen: "Home"
                });
              });
            } else {
              this.refs.toast.show("No changes to be made");
            }
          }}>
            <Text style={styles.Submit}> Save Changes </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => Share.open(shareOptions)}>
            <Text style={styles.Submit}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {
            Alert.alert(
              '',
              'Are you sure?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                  AsyncStorage.removeItem(title)
                  this.refs.toast.show("Note has been deleted", 10, () => {
                    this.props.navigation.navigate("Home", {
                      screen: "Home"
                    });
                  });
                }},
              ],
              { cancelable: false }
            )
          }}>
            <Text style={styles.Delete}> Delete Note </Text>
          </TouchableOpacity>

          <Toast
            ref="toast"
            position='center'
            opacity={0.8}
          />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  card1: {
    paddingTop: 16,
    height: Dimensions.get("window").height,
    backgroundColor: '#F9F7F6'
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
    padding: 10
  },
  Submit: {
    color: '#404d5b',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  Delete: {
    color: '#8b0000',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
