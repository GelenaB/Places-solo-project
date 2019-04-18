import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class LocationInfoBottom extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.place.image[0] }}
          style={{ width: 100, height: 100 }} />
        <Text style={{ flexWrap: 'wrap' }}>{this.props.place.name}</Text>
        <Text>I want to be extra info but I'm not visible with flex row</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'space-between',
  }
})