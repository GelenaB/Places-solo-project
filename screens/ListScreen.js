import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Places from '../PlacesDBSimulator';
import LocationInfoPage from '../components/ListItem';

export default class ListScreen extends React.Component {

  setDetails = (place) => {
    this.setState({ place });
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ padding: 10 }} name='ios-pin' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('NewMap') }}></Ionicons>
  });

  // goes to place instead of map

  render () {

    return (
      <ScrollView style={styles.container}>
        {Places.map(place => <LocationInfoPage navigate={this.props.navigation} key={place.name} place={place} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})