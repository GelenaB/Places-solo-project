import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Places from '../PlacesDBSimulator';
import LocationInfoPage from '../components/ListItem';
import { Location, Permissions } from 'expo';

export default class ListScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = ({
      region: null,
    })
  }

  distance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return Math.round(d) + "km away";
    else if (d <= 1) return Math.round(d * 1000) + "m away";
    return d;
  }

  _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let region = await Location.getCurrentPositionAsync({});
    // let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];
    // use this if need lat & long coords of location

    let userLocationDetails = (await Location.reverseGeocodeAsync(region.coords))[0]; // if not with bracket it will be undefined

    this.setState({
      region,
      userLocationDetails,
    });
  };

  componentDidMount () {
    this._getLocationAsync();
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ paddingRight: 25 }} name='ios-pin' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('Map') }}></Ionicons>
  });

  render () {
    if (!this.state.region) {
      return (<View />) // if not loaded empty screen
    }
    return (
      <ScrollView style={styles.container}>
        {Places.map(place => <LocationInfoPage navigate={this.props.navigation} key={place.name} place={place} distance={this.distance(this.state.region.coords.latitude, this.state.region.coords.longitude, place.latitude, place.longitude)} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})