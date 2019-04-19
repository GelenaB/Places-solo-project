import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Map from '../components/Map';
import LocationInfoBottom from '../components/LocationInfoBottom';
import Places from '../PlacesDBSimulator';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class FullMapScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showDetails: false,
      place: {}
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ padding: 10 }} name='ios-list' size={30} color='#000' onPress={() => { navigation.navigate('List') }}></Ionicons>
  });
  //function is getting an object of 'things', which we're destructuring to get the navigation

  setDetails = (place) => {
    this.setState({ place, showDetails: true });
  }

  render () {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Map places={Places} clickPlace={this.setDetails}></Map>
        {this.state.showDetails && (<LocationInfoBottom place={this.state.place}></LocationInfoBottom>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})