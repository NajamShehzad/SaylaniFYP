import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';


class FacebookBtn extends Component {

  render() { 
    return ( 
      <View>
      <LoginButton
        publishPermissions={["email"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log("Login failed with error: " + error.message);
            } else if (result.isCancelled) {
              console.log("Login was cancelled");
            } else {
              console.log("Login was successful with permissions: " + result.grantedPermissions)
            }
          }
        }
        onLogoutFinished={() => console.log("User logged out")} />
    </View>
     );
  }
}
 
export default FacebookBtn;