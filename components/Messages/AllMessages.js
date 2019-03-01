import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { ListItem, Header, Icon } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import path from "../../config/Path";

class AllMessages extends Component {
  state = {
    refreshing: false,
    chatList: []
  };
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };

  _onRefresh = () => {
    this.cdmFunc();
  };

  getAllChats = (userId) => {
    axios.post(path.GET_ALL_CHATS,{userId}).then(res => {
      console.log(res.data.data);
      this.setState({chatList: res.data.data}); 
    })
  }
  cdmFunc = () => {
    this._asyncGetRegStudent().then(user => {
      console.log(user.studentData.userName)
      this.setState({userData: user.studentData});
      this.getAllChats(user.studentData._id);
    })
  }
  componentDidMount() {
    this.cdmFunc();
  }
  render() {
    const { userData, chatList } = this.state;
    return (
      <View style={styles.container}>
     <Header
      backgroundColor="#6200EE"
      leftComponent={
        <TouchableOpacity
          onPress={() => {
            Actions.pop();
          }}
        >
          <Icon name="chevron-left" type="font-awesome" color="white" />
        </TouchableOpacity>
      }
      centerComponent={{
        text: `${userData ? userData.userName : ''}`,
        style: { color: "#fff", fontFamily: "Kailasa-Bold", fontWeight: "bold" }
      }}
      rightComponent={{
        text: `+`,
        style: { color: "#fff",fontSize: 25 }
      }}
    />
        {/* <ModalService modalVisible={ modalVisible } modalInvisible={(visible) => {this.setState({modalVisible: visible})}} /> */}
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {chatList.length > 0 && chatList.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: `${l.person1_id == userData._id ? l.person2_image : l.person1_image}` } }}
              title={l.person1_id == userData._id ? l.person2_name : l.person1_name}
              onPress={() => {Actions.chatpage({propsData: {person1: `${l.person1_id == userData._id ? l.person1_id : l.person2_id}`,person2: `${l.person1_id == userData._id ? l.person2_id : l.person1_id}`} })}}
              // subtitle={l.subtitle}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
    width: "100%"
  },
  container: {
    backgroundColor: "white",
    padding: 0,
    margin: 0
  },
  cardStyle: {
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    marginBottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default AllMessages;
