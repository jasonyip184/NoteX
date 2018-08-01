import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-easy-toast';

export default class ShareFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      refreshing: false,
    };
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
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err,stores) => {
        stores.map((result, i, store) => {
           let d = {"id":1,"title":store[i][0],"msg":store[i][1]};
           this.state.data.push(d);
        });
        this.setState({
          isLoading: false
        });
        setTimeout(() => this.refs.toast.show("Tap on the note to edit, delete or share", 1000), 500);
      })
    });
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  renderItem(data) {
    let { item, index } = data;
    return (
      <View style={styles.itemBlock}>
        <TouchableOpacity onPress={() => this.openMsg(data)}>
          <Image source={require('../assets/noteLogo.png')} style={styles.itemImage}/>
        </TouchableOpacity>
        <View style={styles.itemMeta}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemLastMessage}>{item.msg}</Text>
        </View>
      </View>
    )
  }

  openMsg(data) {
    var title = data.item.title;
    var msg = data.item.msg;
    const { navigate } = this.props.navigation;
    navigate("EditNote", {
      screen: "EditNote",
      title: title,
      msg: msg
    });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Notes</Text>
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          position='center'
          opacity={0.8}
          fadeOutDuration={1000}
        />
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          ItemSeparatorComponent={this.renderSeparator.bind(this)}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F6"
  },
  itemBlock: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingLeft: 5
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1, flexWrap: 'wrap',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemName: {
    fontSize: 22,
  },
  itemLastMessage: {
    marginLeft: 30,
    fontSize: 12,
    color: "#111",
  },
  separator: {
    height: 1,
    width: "100%",
    alignSelf: 'center',
    backgroundColor: "#E4E4E4"
  },
  header: {
    padding: 5,
    paddingBottom: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
});
