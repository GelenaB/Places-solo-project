import React from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, Button, TouchableOpacity, Platform, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

        <ScrollView horizontal={true}>

          {this.place.image.map((image, index) =>
            <View key={index} style={{ height: 27 }} style={styles.imagesBox}>
              <Image style={styles.images} source={{ uri: image.url }} />

              <View style={styles.photoCredit}>
                <Ionicons style={{ padding: 3 }} name='ios-camera' size={25} color='rgba(130,4,150, 0.6)' />
                <Text>{image.author}</Text>
              </View>

            </View>)}
        </ScrollView>

        <Text style={styles.description}>{this.place.description}</Text>

        <View style={styles.directions}>
          <Ionicons name='ios-pin' size={45} color='rgba(130,4,150, 0.9)' onPress={() => this._handlePressDirections()} ></Ionicons>
          <Text>Get directions</Text>
        </View>
      </View>
    )
  }
}

<Ionicons style={{ padding: 10 }} name='ios-list' size={30} color='#000' onPress={() => { navigation.navigate('List') }}></Ionicons>

const styles = StyleSheet.create({

  imagesBox: {
    padding: 6,
    paddingTop: 25,
  },
  images: {
    width: 330,
    height: 380,
  },
  photoCredit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    padding: 15,
    alignSelf: 'center',
  },
  directions: {
    alignSelf: 'center',
    alignItems: 'center',
  }
})