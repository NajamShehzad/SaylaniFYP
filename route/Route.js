import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
import { View, TouchableOpacity } from "react-native";
import LoginPage from "../components/loginPage/LoginPage";
import Home from "../components/home/Home";
import UploadData from "../components/uploadData/UploadData";
import { Icon } from "react-native-elements";
import Profile from "../components/profile/Profile";
import Services from "../components/services/Services";
import ContactsList from "../components/contactsList/ContactsList";
import AddService from "../components/addService/AddService";
import { Header } from "react-native-elements";
import SearchPage from "../components/searchPage/SearchPage";
import Activites from "../components/activites/Activites";
import { AsyncStorage } from "react-native";
import Chat from "../components/messages/Chat";
import AllMessages from "../components/messages/AllMessages";
import { LoginManager } from "react-native-fbsdk";

const ElementHeader = props => {
  console.log(props);
  return (
    <Header
      backgroundColor="#6200EE"
      leftComponent={
        <TouchableOpacity onPress={() => {Actions.allmessages()}}> 
        <Icon
        name="envelope"
        type="font-awesome"
        color="#fff"
      />
      </TouchableOpacity>
       
      }
      centerComponent={{
        text: "Fiverr",
        style: { color: "#fff", fontWeight: "bold" }
      }}
      rightComponent={
        <TouchableOpacity onPress={() => {
          console.log(LoginManager)
          LoginManager.logOut();

          // LoginManager.onLogoutFinished()
            AsyncStorage.clear(() => {
              console.log("cleared storage");
              Actions.replace("loginpage");
            });
          // })
        }}> 
        <Icon
          name="sign-out"
          type="font-awesome"
          color="#fff"
         
        />
        </TouchableOpacity>
      }
    />
  );
};
class Route extends Component {
  render() {
    const TabIcon = ({ focused, title }) => {
      switch (title) {
        case "home":
          console.log(focused);
          return (

            <Icon
              name="home"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "profile":
          return (
            <Icon
              name="user"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "Search":
          return (
            <Icon
              name="search"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        case "Activites":
          return (
            <Icon
              name="bell"
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        default: {
          return (
            <Icon
              // name={focused ? "far fa-user" : "ios-speedometer-outline"}
              type="font-awesome"
              size={30}
              color={focused ? "#6200EE" : "#6200ee7a"}
            />
          );
        }
      }
    };

    return (
      <Router navBar={ElementHeader}>
        <Stack key="root">
          <Scene
            key="loginpage"
            component={LoginPage}
            title="Login"
            hideNavBar={true}
          />

          <Scene
            key="home"
            tabs={true}
            showLabel={false}
            hideNavBar={true}
            tabBarPosition="bottom"
          >
            <Scene
              key="homePage"
              title="home"
              component={Home}
              icon={TabIcon}
              showLabel={false}
            />
            <Scene
              key="searchPage"
              title="Search"
              component={SearchPage}
              icon={TabIcon}
              showLabel={false}
              hideNavBar={true}
            />
            <Scene
              key="activitesPage"
              title="Activites"
              component={Activites}
              icon={TabIcon}
              showLabel={false}
            />
            <Scene
              key="profilePage"
              title="profile"
              icon={TabIcon}
              showLabel={false}
            >
              <Scene
                key="profilePageDashboard"
                component={Profile}
                showLabel={false}
              />
              <Scene
                key="profilePageServices"
                component={Services}
                showLabel={false}
                hideNavBar={true}
              />
              <Scene
                key="contactListPage"
                component={ContactsList}
              />
              <Scene
                key="addServicePage"
                component={AddService}
              />
              <Scene
                key="uploaddata2" component={UploadData}
              />
            </Scene>
          </Scene>

          <Scene key="chatpage" hideNavBar={true} component={Chat} title="Chat" />
          <Scene key="allmessages" component={AllMessages} hideNavBar={true} title="Chats" />
          <Scene key="uploaddata" component={UploadData} title="Upload Data" />
        </Stack>
      </Router>
    );
  }
}

export default Route;
