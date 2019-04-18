import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

export default class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = { location: null };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    // location gets current location
    // sagrada contains latitute and longitude
    // location details is your current location

    let location = await Location.getCurrentPositionAsync({});
    // let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];

    let userLocationDetails = (await Location.reverseGeocodeAsync(location.coords))[0]; //if not with bracket it will be undefined

    this.setState({
      location,
      userLocationDetails,
    });
  };

  componentDidMount () {
    this._getLocationAsync();
  }

  markerClick (place) {
    this.props.clickPlace(place);
  }

  render () {
    if (!this.state.location) {
      return (<View />) // if not loaded empty screen
    }
    return (
      <MapView
        style={{ flex: 1 }}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922 / 2.5, //zoom
          longitudeDelta: 0.0421 / 2.5,
        }}>

        {this.props.places.map(place => <MapView.Marker key={place.name} coordinate={place} onPress={() => this.markerClick(place)} />)}

        {<MapView.Marker coordinate={this.state.location.coords} title='You are here' description={this.state.userLocationDetails.name} />}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
