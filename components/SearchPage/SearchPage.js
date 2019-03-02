import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import { RkCard, RkTheme, RkText, RkButton } from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import { AsyncStorage } from "react-native";
import axios from "axios";
import path from "../../config/Path";
import { Dropdown } from "react-native-material-dropdown";
import _ from "lodash";
import HomeItemCard from "../home/HomeItemCard";
import ModalService from "../modalService/ModalService";

class SearchPage extends Component {
  state = {
    updateSearch: "",
    category: "",
    refreshing: false,
    searched: [],
    feed: [],
    modalVisible: false,
    modalData: {}
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
    this.setState({ refreshing: true });
    axios.post(path.GET_SERVICES).then(res => {
      console.log(res.data.data);
      this.setState({ refreshing: false, workingData: res.data.data });
    });
  }

  getData = cate => {
    this.setState({ refreshing: true });
    axios.post(path.GET_SERVICES).then(res => {
      console.log(res.data.data);
      this.setState({ refreshing: false, workingData: res.data.data });
    });
  };
  searchItem = () => {
    const { updateSearch, category, workingData } = this.state;
    console.log(updateSearch, category);
    // if(category && category !== 'All'){
    var a = workingData;
    var arr = a.filter(res => {
      if (res.title.toLowerCase().indexOf(updateSearch.toLowerCase()) > -1) {
        console.log(res.title.toLowerCase());
        console.log(updateSearch.toLowerCase());
        if (!category || category.toLowerCase() == "all") {
          return res;
        }
        if (res.category.toLowerCase() == category.toLowerCase()) {
          return res;
        }
      }
      return false;
      // ((res.category).toLowerCase() == category.toLowerCase()) && (res.title.toLowerCase().indexOf(updateSearch.toLowerCase()) > -1) && res});
    });
    console.log(arr);
    this.setState({ searched: arr });
    // }
  };

  render() {
    const {
      searched,
      updateSearch,
      modalVisible,
      modalData
    } = this.state;
    let data = [
      {
        value: "All"
      },
      {
        value: "Mechanic"
      },
      {
        value: "Plumber"
      },
      {
        value: "Car painter"
      },
      {
        value: "Labour"
      },
      {
        value: "Electrician"
      },
      {
        value: "AC Technician"
      }
    ];
    return (
      <View>
        <ModalService
          modalData={modalData}
          modalVisible={modalVisible}
          modalInvisible={visible => {
            this.setState({ modalVisible: visible });
          }}
        />

        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch =>
            this.setState({ updateSearch }, () => {
              // console.log(updateSearch)
              // _.debounce(() => this.searchItem(),300)
              this.searchItem();
            })
          }
          containerStyle={{ width: "100%", backgroundColor: "#6200EE" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          inputStyle={{ color: "#6200EE" }}
          value={updateSearch}
        />
        <Dropdown
          label="Categories"
          data={data}
          fontSize={15}
          textColor="#6200EE"
          containerStyle={{
            width: "100%",
            backgroundColor: "#fff",
            padding: 0,
            margin: 0,
            borderColor: "white"
          }}
          shadeOpacity={0}
          selectedItemColor="#6200EE"
          itemColor="gray"
          onChangeText={category =>
            this.setState({ category, updateSearch: "" })
          }
        />
        {/* </Header> */}
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {searched.map(value => (
            <HomeItemCard
              cardData={{ value }}
              changeState={paramsState => {
                this.setState(paramsState);
              }}
            />
          ))}
          <View style={{ width: "100%", height: 50 }} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 70,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    width: "100%"
  }
});

export default SearchPage;
