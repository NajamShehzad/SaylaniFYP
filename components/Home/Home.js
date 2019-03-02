import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { AsyncStorage } from "react-native";
import Axios from "axios";
import path from "../../config/Path";
import ModalService from "../modalService/ModalService";
import HomeItemCard from "./HomeItemCard";


class Home extends Component {
  state = {
    feed: [],
    refreshing: false,
    modalVisible: false,
    modalData: {}
  };

  _onRefresh = () => {
    this.cdmFUn();
  };

  _asyncGetRegStudent = async () => {
    try {
      let user = await AsyncStorage.getItem("regStudent");
      console.log(user);
    } catch (er) {
      console.log(er);
    }
  };
  componentDidMount() {
    this.cdmFUn();
  }

  cdmFUn = () => {
    this.setState({ refreshing: true });
    this._asyncGetRegStudent().then(stdData => {
      Axios.post(path.GET_SERVICES).then(data => {
        if (data.data.success) {
          console.log(data.data.data);
          this.setState({ feed: data.data.data, refreshing: false });
        } else {
          this.setState({ refreshing: false });
          alert("An error occur!");
        }
        console.log(data);
      });
    });
  };

  render() {
    const { feed, modalVisible, modalData } = this.state;
    return (
      <View>
        <ModalService
          modalData={modalData}
          modalVisible={modalVisible}
          modalInvisible={visible => {
            this.setState({ modalVisible: visible });
          }}
        />

        <ScrollView
          style={{ minHeight: 50 }}
          automaticallyAdjustContentInsets={true}
          style={[styles.screen]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {feed.map((value,index) => (
            <HomeItemCard
            key={index}
              cardData={{ value }}
              changeState={paramsState => {
                this.setState(paramsState);
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f0f1f5"
  }
});

export default Home;
