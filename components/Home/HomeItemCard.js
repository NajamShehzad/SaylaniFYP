import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { RkCard, RkTheme, RkText } from "react-native-ui-kitten";


RkTheme.setType("RkText", "cardPrice", {
  color: "#6200EE",
  paddingLeft: 15,
  fontWeight: "bold"
});

class HomeItemCard extends Component {
  state = {
    feed: [],
    refreshing: false,
    modalVisible: false,
    modalData: {}
  };

  
  render() {
    const { value } = this.props.cardData;
    console.log(this.props)
    return (
       <View style={{ paddingTop: 10, paddingBottom: 10 }}>
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
                  <RkText rkType="cardText">{value.discription}</RkText>
                </View>
                <RkText rkType="cardPrice">Rs: {value.amount}</RkText>
                <View rkCardFooter={true}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changeState({ modalVisible: true,modalData: value });
                    }}
                  >
                    <Text>Open</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changeState({ modalVisible: true });
                    }}
                  >
                    <Text>Hire</Text>
                  </TouchableOpacity>
                </View>
              </RkCard>
            </View>
    );
  }
}


export default HomeItemCard;
