import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { LoginButton } from "react-native-fbsdk";
import FacebookBtn from "../FacebookBtn";
// const FBSDK = require('react-native-fbsdk');
import FBSDK, { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { Actions } from "react-native-router-flux";
import axios from 'axios';
import path from '../../config/Path';
import { AsyncStorage } from 'react-native';

class LoginPage extends Component {

  state = {
    logedIn: false
  };

  async componentWillMount() {
    var userData = JSON.parse(await AsyncStorage.getItem('regStudent'));
    console.log(userData);
    if (userData) {
      if (userData.already && userData.studentData.profilePhoto && userData.studentData.phoneNumber) {
        console.log('userData1', userData);
        Actions.replace("home");
      }
      else {
        console.log('userData2', userData);
        Actions.replace("uploaddata");
      }
    }
    else {
      console.log('userData3', userData);
      // Actions.replace("uploaddata");
    }
  }


  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('regStudent', data);
      console.log(data);
    } catch (error) {
      console.log('User Auth error');
    }
  };

  _fbAuth = () => {
    const th = this;
    // Attempt a login using the Facebook login dialog,
    // asking for default permissions.
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login was cancelled");
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then(data => {
            console.log("access Token===>", data);
            let accessToken = data.accessToken
            // console.log(accessToken.toString())

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
                // alert('Error fetching data: ' + error.toString());
              } else {
                console.log(path.LOGIN_AUTHENTICATION);
                axios.post(path.LOGIN_AUTHENTICATION, {
                  name: result.name,
                  fbId: result.id,
                  accessToken: accessToken
                })
                  .then(response => {
                    th._storeData(JSON.stringify(response.data));
                    console.log(response.data);
                    if (response && response.data.studentData.profilePhoto && response.data.studentData.phoneNumber) {
                      Actions.replace("home");
                    }
                    else {
                      Actions.replace("uploaddata");
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }
            }

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log("Login failed with error: " + error);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Facebook Login</Text>
        {/* <FacebookBtn /> */}
        <Button title="fb login" onPress={this._fbAuth} />
        <Button
          title="Home"
          onPress={() => {
            Actions.replace("home");
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
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

export default LoginPage;
