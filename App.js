import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {

  state = {
    location: null,
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];
    let hospital = (await Location.geocodeAsync('Carrer de Sant Quintí, 89, 08041 Barcelona'))[0];
    let tibibado = (await Location.geocodeAsync('Cumbre del Tibidabo, 08035 Barcelona'))[0];
    this.setState({
      location,
      places: {
        sagrada,
        hospital,
        tibibado
      }
    });
  };


  componentDidMount () {
    this._getLocationAsync();
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapView.Marker coordinate={this.state.location.coords} title='You are here' />
        <MapView.Marker coordinate={this.state.places.sagrada} title='Sagrada Familia' description='something' />
        <MapView.Marker coordinate={this.state.places.hospital} title="Hospital Sant Pau" />
        <MapView.Marker coordinate={this.state.places.sagrada} title="Tibidabo" />
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
