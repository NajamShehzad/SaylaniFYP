import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import {
  RkCard,
  RkTheme,
  RkText,
  RkButton
} from "react-native-ui-kitten";
import {  SearchBar } from "react-native-elements";
import { AsyncStorage } from "react-native";
import axios from "axios";
import path from "../../config/Path";
import { Dropdown } from "react-native-material-dropdown";
import _ from "lodash";

class SearchPage extends Component {
  state = {
    updateSearch: "",
    category: '',
    refreshing: false,
    searched: []
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
    this.setState({refreshing: true});
    axios.post(path.GET_SERVICES).then(res => {
      console.log(res.data.data);
      this.setState({refreshing: false,workingData: res.data.data})
    })
  }

  getData = (cate) => {
    this.setState({refreshing: true});
    axios.post(path.GET_SERVICES).then(res => {
      console.log(res.data.data);
      this.setState({refreshing: false,workingData: res.data.data})
    })
  }
  searchItem = () => {
    const { updateSearch, category, workingData } = this.state;  
    console.log(updateSearch,category);
    // if(category && category !== 'All'){
      var a = workingData;
      var arr = a.filter(res => {
        if(res.title.toLowerCase().indexOf(updateSearch.toLowerCase()) > -1){
          
          console.log(res.title.toLowerCase());
          console.log(updateSearch.toLowerCase());
          if(!category || category.toLowerCase() == 'all'){
            return(res)
          }
          if((res.category).toLowerCase() == category.toLowerCase()){
            return(res)
          }
        }
        return false
        // ((res.category).toLowerCase() == category.toLowerCase()) && (res.title.toLowerCase().indexOf(updateSearch.toLowerCase()) > -1) && res});
    }
      );
      console.log(arr);
      this.setState({searched: arr})
    // }
  };

  render() {
    const { userServices, searched, updateSearch } = this.state;
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
        {/* <Header backgroundColor= '#6200EE'> */}
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
            border: 3,
            borderColor: "white"
          }}
          overlayStyle={{ border: 0 }}
          shadeOpacity={0}
          selectedItemColor="#6200EE"
          itemColor="gray"
          onChangeText={category => this.setState({category,updateSearch: ''})}
        />
        {/* </Header> */}
        <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >
         {searched.map((value,index) => (<View style={{paddingTop: 10,paddingBottom: 10}}>
          
          <RkCard key={value}>
            <View rkCardHeader={true}>
              <View>
                <RkText rkType="header">{value.title}</RkText>
                <RkText rkType="subtitle">{value.category}</RkText>
              </View>
            </View>
            <Image
              rkCardImg={true}
              source={{
                uri: value.imageUrl
              }}
            />
            <View rkCardContent={true}>
              <RkText rkType="cardText">
              {value.discription}
              </RkText>
            </View>
            <View >
              <RkText rkType="cardPrice">
              Rs: {value.amount} 
              </RkText>
            </View>
            <View rkCardFooter={true}>
              {/* <RkButton rkType="clear link"> */}
                {/* <Icon name="heart" style={likeStyle} /> */}
                {/* <RkText rkType="accent">18 Likes</RkText> */}
              {/* </RkButton> */}
              <RkButton rkType="clear link">
                {/* <Icon name="comment-o" style={iconButton} /> */}
                <RkText rkType="hint">Open</RkText>
              </RkButton>
              <RkButton rkType="clear link">
                {/* <Icon name="send-o" style={iconButton} /> */}
                <RkText rkType="hint">Order</RkText>
              </RkButton>
            </View>
          </RkCard>
        </View>
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
  }
});

export default SearchPage;
