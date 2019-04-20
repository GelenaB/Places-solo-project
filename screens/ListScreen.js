import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Places from '../PlacesDBSimulator';
import LocationInfoPage from '../components/LocationInfoPage';

export default class ListScreen extends React.Component {

  setDetails = (place) => {
    this.setState({ place });
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ padding: 10 }} name='ios-map' size={30} color='#000' onPress={() => { navigation.navigate('NewMap') }}></Ionicons>
  });

  // goes to place instead of map

  render () {
    console.log(this.props.navigation)

    return (
      <View style={styles.container}>
        {Places.map(place => <LocationInfoPage navigate={this.props.navigation} key={place.name} place={place} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})