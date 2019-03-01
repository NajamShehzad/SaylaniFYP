import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ScrollView
} from "react-native";
import { AsyncStorage } from "react-native";
import { Image } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import path from "../../config/Path";
import ModalDropdown from "react-native-modal-dropdown";

// import ImagePicker from "react-native-image-picker";

class AddService extends Component {
  state = {
    myNumber: "",
    profilePhoto:
      "http://tcfwa.com/wp-content/themes/nevia2/images/shop-01.jpg",
    avatar: "",
    title: '',
    amount: '',
    discription: '',
    category: 'mechanic'
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

  

  sendData = () => {
    console.log("call__________");
    const { avatar, title, amount, discription, category } = this.state;
    this._asyncGetRegStudent().then(res => {
      console.log(!!res);
      // console.log({ image: avatar, title, amount, discription, category, user_id: res.studentData._id });
      if(res.studentData._id && avatar && title && amount && discription && category){
        console.log({ image: 'data:image/png;base64,'+avatar, title, amount, discription, category, user_id: res.studentData._id });
        axios.post(path.ADD_SERVICE,{ image: 'data:image/png;base64,'+avatar, title, amount, discription, category, user_id: res.studentData._id }).then(res => {
          console.log(res);
          if(res.data.success){
            this.setState({
              title: '',
    amount: '',
    discription: ''
            },() => {
              alert('Successfully Uploaded');
            })
          }
        })
      }
      else{
        alert('fill all fields!');
      }
    })
  };

  updateData = () => {
    const { myNumber, profilePhoto } = this.state;
    this._asyncGetRegStudent().then(res => {
      if (res) {
        axios
          .post(path.UPDATE_NUMBER_PROFILE, {
            fbId: res.studentData.fbId,
            phoneNumber: myNumber,
            profilePhoto: profilePhoto
          })
          .then(data => {
            console.log(data);
          });
      }
    });
  };

  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return JSON.parse(user);
    } catch (er) {
      return false;
    }
  };
  componentDidMount() {
    this._asyncGetRegStudent();
  }

  render() {
    const { avatar, title, amount, discription, category } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ height: 200 }}>
            {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  console.log("Image base64 string: ", avatar);
                  this.setState({ avatar });
                }
              }}
            >
              <Image
                style={{
                  paddingVertical: 30,
                  width: 150,
                  height: 150
                  // borderRadius: 75
                }}
                resizeMode="cover"
                source={{
                  uri: this.state.profilePhoto
                }}
                onChanged={res => {
                  console.log("Changdedd===>", res);
                }}
                ref={el => (this.canvas = el)}
              />
            </PhotoUpload>
            {/* <Image ref={el => (this.canvas = el)} style={{ display: "none" }} /> */}
          </View>
          <View style={{ ...styles.horCenterCont }}>
            <Input
              placeholder="Title"
              containerStyle={styles.textInput}
              inputStyle={{ paddingLeft: 10, color: "gray" }}
              onChangeText={title => {this.setState({title})}}
              value={title}
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
          <View style={{ ...styles.horCenterCont }}>
            <Input
              placeholder="Amount"
              containerStyle={styles.textInput}
              inputStyle={{ paddingLeft: 10, color: "gray" }}
              onChangeText={amount => {this.setState({amount})}}
              value={amount}
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
          <View style={{ ...styles.horCenterCont }}>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Discription"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={discription}
              onChangeText={discription => {this.setState({discription})}}
            />
          </View></View>
          <View style={{ height: 150 }}>
            <Picker
              mode="dropdown"
              selectedValue={category}
              style={{ height: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ category: itemValue })
              }
            >
              <Picker.Item label="Mechanic" value="Mechanic" />
              <Picker.Item label="Plumber" value="Plumber" />
              <Picker.Item label="Car painter" value="Car painter" />
              <Picker.Item label="Labour" value="Labour" />
              <Picker.Item label="Electrician" value="Electrician" />
              <Picker.Item label="AC Technician" value="AC Technician" />
            </Picker>
          </View>

          <View style={styles.horCenterCont}>
            <Button
              containerStyle={{ width: "60%", marginTop: 20 }}
              buttonStyle={{ backgroundColor: "gray", borderRadius: 27 }}
              title="UPLOAD b64"
              onPress={this.sendData}
            />
          </View>
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 1,
    padding: 10,
    color: "gray",
    width: "70%",
    margin: "auto",
    backgroundColor: "lightgray",
    borderWidth: 0,
    borderRadius: 27
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
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
    // height: 80
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

export default AddService;
