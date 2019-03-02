import React, {
  Component
} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


const GOOGLE_MAPS_APIKEY = "AIzaSyANkUfLBovPhWMJohvoCTbFbo3Rd7uPLSo";

// const GOOGLE_MAPS_APIKEY = "AIzaSyDIeSjbMLDrRh32wXjMPfzWr0p7SEv4DsY";

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationResult: null,
      location: {
        coords: {
          latitude: 24.926294,
          longitude: 67.022095
        }
      },
      marker: false,
      routes: null,
      coords: null,
      origin: null,
      destination: {
        latitude: 24.946294,
        longitude: 67.032095
      }
    };
  }


  componentDidMount() {

    this._getLocationAsync();

  }

  _getLocationAsync = async () => {

    navigator.geolocation.getCurrentPosition(position => {
      const location = JSON.stringify(position);
      this.setState({
        location: position, origin: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
      console.log(location);
    },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // this.setState({ locationResult: JSON.stringify(location), location, marker: true, origin: cordss });
  };


  handleChange(userLocation) {
    console.log("User Location ===>", userLocation);
    let origin = { latitude: userLocation.latitude, longitude: userLocation.longitude };
    console.log(origin);
    this.setState({ origin })
  }


  render() {
    const { location, marker, origin, destination } = this.state;
    console.log(origin);
    return (
      <MapView
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onUserLocationonChange={(userLocation => this.handleChange(userLocation))}
        onMapReady={() => this._getLocationAsync()}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        }
        showsUserLocation={
          true
        }
      >
        {origin && <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="lightblue"
        />}
        {origin &&

          <Marker
            coordinate={destination}
          />}


      </MapView>
    );
  }
}