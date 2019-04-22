import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Places from '../PlacesDBSimulator';
import LocationInfoPage from '../components/ListItem';

export default class ListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ paddingRight: 25 }} name='ios-pin' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('Map') }}></Ionicons>
  });

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