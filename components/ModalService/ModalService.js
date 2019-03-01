import React, { Component } from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  AsyncStorage
} from "react-native";
import { ActivityIndicator } from "react-native";
import { Image, ListItem, Text,Button } from "react-native-elements";
import { Icon, Header } from "react-native-elements";
import { Actions } from 'react-native-router-flux';


class ModalService extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      return(JSON.parse(user));
    } catch (er) {
      return false;
    }
  };
componentDidMount() {
  this._asyncGetRegStudent().then(res => {
    if(res){
      console.log(res.studentData);
      this.setState({userData: res.studentData});
    }
  })
}
  render() {
    const { modalData } = this.props;
    const { userData } = this.state;
    const { width, height } = Dimensions.get("window");
    console.log(modalData);
    return (
      // <View style={{marginTop: 22}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <Header
          backgroundColor="#6200EE"
          placement="left"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.modalInvisible(false);
              }}
            >
              <Icon
                name="angle-down"
                type="font-awesome"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <Image
            source={{ uri: modalData.imageUrl }}
            style={{ width: "100%", height: 250, paddingTop: 10 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View>
            <ListItem
              leftAvatar={{ source: { uri: modalData.imageUrl } }}
              title={modalData.title}
              subtitle={modalData.category}
            />
          </View>
          <View style={{ width: "90%", marginLeft: "5%" }}>
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black" }} h3>
                {modalData.title}
              </Text>
              <Text style={{ color: "gray" }}>{modalData.category}</Text>
            </View>
            <View
              style={{
                borderBottomColor: "lightGray",
                borderBottomWidth: 1,
                width: '100%',
                paddingBottom: 20,
                marginBottom: 20
              }}
            />
            <Text h4>Discription:</Text>
            <Text style={{color: 'gray'}}>{modalData.discription}:</Text>
            {userData && (userData._id !=  modalData.user_id) && <View style={{paddingTop: 50}}>
              <Button
              onPress={() => {this.props.modalInvisible(false); Actions.chatpage({propsData: {person1: userData._id,person2: modalData.user_id} })}}
              containerStyle={{marginBottom: 10}} buttonStyle={{backgroundColor: "#6200EE"}} title="SEND MESSAGE" type="solid"/>
              <Button containerStyle={{marginBottom: 10}} buttonStyle={{borderColor: "#6200EE"}} titleStyle={{color: "#6200EE"}} title="HIRE" type="outline"/>
            </View>}
          </View>
        </ScrollView>
      </Modal>

    );
  }
}

export default ModalService;
