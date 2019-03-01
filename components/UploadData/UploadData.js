import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { AsyncStorage } from "react-native";
import { Image } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import axios from 'axios';
import path from "../../config/Path";
import { Actions } from "react-native-router-flux";

class UploadData extends Component {
  state = {
    myNumber: "",
    profilePhoto: "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg",
    avatar: ''
  };

  onChanged(text) {
    if ((text * 1 && text.length < 12) || text == "" || text == "0") {
      this.setState({ myNumber: text });
      console.log(text);
    } else if (text.length > 10) {
      console.log("it should be les then 11");
    } else {
      console.log("Char not allowed");
    }
  }

  updateData = () => {
    
    const { myNumber, avatar } = this.state;
    this._asyncGetRegStudent().then((resp) => {
      var responce = resp;
      if(responce && avatar){

        console.log(responce);
        console.log('data:image/png;base64,'+ avatar);
        axios.post(path.UPDATE_NUMBER_PROFILE, {
      fbId: responce.studentData.fbId,
      phoneNumber: myNumber,
      profilePhoto: 'data:image/png;base64,'+ avatar
    }).then(data => {
      console.log(data.data);
      // console.log(this._asyncGetRegStudent());
      this._asyncGetRegStudent().then((res) => {
        console.log(res);
        var newData = res;
        console.log(data.data.studentData);
        if(data.data.studentData){
          newData.studentData = data.data.studentData;
          console.log(res)
          this._storeData(JSON.stringify(newData)).then(res => {
            console.log(res)
            if(res){
              Actions.replace("home");  
              console.log(res);
            }
            else{
              console.log('error')
            }
          })
        }
      })
      
    })
      }
    });

  }
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('regStudent', data);
      console.log(data);
      return true;
    } catch (error) {
      console.log('User Auth error');
      return false;
    }
  };
  _asyncGetRegStudent = async () => {
    try{
      let user = await AsyncStorage.getItem('regStudent');
     return JSON.parse(user)
    }
    catch(er){
      return false
    }
  }
  componentDidMount() {
    this._asyncGetRegStudent();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 200 }}>
          <PhotoUpload
            // containerStyle={{height: 150, backgroundColor: 'powderblue'}}
            onPhotoSelect={avatar => {
              if (avatar) {
                this.setState({avatar})
              }
            }}
          >
            <Image
              style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75
              }}
              resizeMode="cover"
              source={{
                uri: this.state.profilePhoto
              }}
            />
          </PhotoUpload>
        </View>
        <View style={{ ...styles.horCenterCont }}>
          <Input
            placeholder="Enter you Number"
            containerStyle={styles.textInput}
            inputStyle={{ paddingLeft: 10, color: "gray" }}
            onChangeText={text => this.onChanged(text)}
            value={this.state.myNumber}
            inputContainerStyle={{
              backgroundColor: "lightgray",
              borderWidth: 0,
              borderRadius: 27
            }}
            leftIcon={{
              type: "font-awesome",
              name: "phone",
              size: 20,
              color: "gray"
            }}
          />
        </View>
        <View style={styles.horCenterCont }>
          <Button
            containerStyle={{width: '60%',marginTop: 20,}}
            buttonStyle={{backgroundColor: 'gray',borderRadius: 27}}
            title="UPDATE"
            onPress={this.updateData}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonUpdate: {
    width: "70%",
    backgroundColor: "gray",
    borderRadius: 27
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  horCenterCont: {
    display: "flex",
    alignItems: "center"
  },
  textInput: {
    // paddingLeft: 20,
    // backgroundColor: "#ebebeb",
    // borderRadius: 27,
    // fontSize: 15,
    width: "70%",
    color: "gray",
    // height: 50,
    margin: "auto"
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

export default UploadData;
