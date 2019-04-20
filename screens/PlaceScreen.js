import React from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, Button, TouchableOpacity, Platform, Linking } from 'react-native';

export default class PlacePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  // pass location from user

  _handlePressDirections = () => {
    let address = 'Carrer de Mallorca, 401';
    let postalCode = '08013';
    let city = 'Barcelona';

    let daddr = encodeURIComponent(`${address} ${postalCode}, ${city}`);

    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  };


  place = this.props.navigation.state.params.place;

  render () {
    return (
      <View >
        <View style={styles.topView}>
          <Text>{this.place.name}</Text>
        </View>

        <ScrollView horizontal={true}>

          {this.place.image.map(image => <View key={image.author} style={{ height: 27 }} style={styles.imagesBox}><Image
            style={styles.images}
            source={{ uri: image.url }}
          /><Text>photo by {image.author}</Text></View>)}
        </ScrollView>

        <Text>{this.place.description}</Text>
        <Button title='press' onPress={() => this._handlePressDirections()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  topView: {
    flexDirection: 'column',
  },
  imagesBox: {
    padding: 10,
  },
  images: {
    width: 330,
    height: 380,
  }
})