import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

export default class LocationInfoBottom extends React.Component {

  // constructor (props) {
  //   super(props);
  //   this.state = ({
  //     region: null,
  //   })
  // }

  // distance = (lat1, lon1, lat2, lon2) => {
  //   var R = 6371; // km (change this constant to get miles)
  //   var dLat = (lat2 - lat1) * Math.PI / 180;
  //   var dLon = (lon2 - lon1) * Math.PI / 180;
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   if (d > 1) return Math.round(d) + "km";
  //   else if (d <= 1) return Math.round(d * 1000) + "m";
  //   return d;
  // }

  // _getLocationAsync = async () => {

  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let region = await Location.getCurrentPositionAsync({});
  //   // let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];
  //   // use this if need lat & long coords of location

  //   let userLocationDetails = (await Location.reverseGeocodeAsync(region.coords))[0]; // if not with bracket it will be undefined

  //   this.setState({
  //     region,
  //     userLocationDetails,
  //   });
  // };

  // componentDidMount () {
  //   this._getLocationAsync();
  // }

  onPressed = (place) => {

    this.props.navigate.navigate(
      'Place',
      { place: place }
    );
  }

  render () {


    return (

      < View style={styles.container} >

        <Image source={{ uri: this.props.place.image[0].url }}
          style={styles.image} />

        <TouchableOpacity onPress={() => { this.onPressed(this.props.place) }} style={styles.description}>
          <Text style={[styles.text, styles.title]}>{this.props.place.name}</Text>
          <Text style={styles.text}>{this.props.place.address}</Text>
          <Text style={styles.text}>{this.props.distance}</Text>
        </TouchableOpacity>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    padding: 5,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 100,
    width: 100,
  },
  description: {
    flex: 2.7,
    padding: 10,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})