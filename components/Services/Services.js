import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { Card, ListItem, Button, Icon, Header } from "react-native-elements";

import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import path from "../../config/Path";
import ModalService from "../ModalService/ModalService";

class Services extends Component {
  state = {
    userData: "",
    userServices: [],
    refreshing: false,
    modalVisible: false
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
    this.cdmFun();
  }
  cdmFun = () => {
    this.setState({refreshing: true})
    this._asyncGetRegStudent().then(data => {
      if (data) {
        console.log(data.studentData);
        this.setState({ userData: data.studentData }, () => {
          const { userData } = this.state;
          axios
            .post(path.GET_USER_SERVICES, { user_id: userData._id })
            .then(res => {
              if (res.data.success) {
                console.log(res.data.data);
                this.setState({userServices: res.data.data, refreshing: false});
              }
              else{
                this.setState({refreshing: false})
              }
            });
        });
      }
    });
  }
  componentDidMount() {
  this.cdmFun();
  }
  render() {
    const users = [
      {
        name: "brynn",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];
    const { userServices, userData, modalVisible } = this.state;

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
        text: `My Services`,
        style: { color: "#fff", fontFamily: "Kailasa-Bold", fontWeight: "bold" }
      }}
      rightComponent={{
        text: `+`,
        style: { color: "#fff",fontSize: 25 }
      }}
    />
      {/* <ModalService modalVisible={ modalVisible } modalInvisible={(visible) => {this.setState({modalVisible: visible})}} /> */}
        <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
          {/* <Text style={styles.welcome}>Services</Text> */}
          <Button
            title="Add Services"
            buttonStyle={{backgroundColor: "#6200EE"}}
            onPress={() => {
              // console.log(Actions);
              Actions.addServicePage();
            }}
          />

          {userServices.length >= 0 &&
            userServices.map(service => {
              return (
                <Card
                  containerStyle={styles.cardStyle}
                  title={`${service.title}`}
                  image={{
                    uri: `${service.imageUrl}`
                  }}
                ><Text style={{ marginBottom: 10 }}>{`${service.discription}`}</Text><Button
                    icon={<Icon name="code" color="#ffffff" />}
                    backgroundColor="#03A9F4"
                    buttonStyle={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                      backgroundColor: "#6200EE"
                    }}
                    title="VIEW NOW"
                  /></Card>
              );
            })}
          {/* <Card
            containerStyle={styles.cardStyle}
            title="HELLO WORLD"
            image={{
              uri:
                "https://d1r8m46oob3o9u.cloudfront.net/images/home-demo-photo-2c.jpg"
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="VIEW NOW"
            />
          </Card>
        */}
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
    // flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF",
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

export default Services;
