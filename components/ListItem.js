import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class LocationInfoBottom extends React.Component {

  onPressed = (place) => {
    this.props.navigate.navigate(
      'Place',
      { place: place }
    );
  }

  render () {
    return (
      < View style={styles.container} >
        <Image source={{ uri: this.props.place.image[0].url }} style={styles.image} />

        <TouchableOpacity onPress={() => { this.onPressed(this.props.place) }} style={styles.description}>
          <Text style={[styles.text, styles.title]}>{this.props.place.name}</Text>
          <Text style={styles.text}>{this.props.place.address}</Text>
          <Text style={[styles.text, styles.address]}>{this.props.place.distanceNumber} {this.props.place.distanceMeasure} away</Text>
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
  address: {
    paddingTop: 5,
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})