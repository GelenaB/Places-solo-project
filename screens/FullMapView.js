import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapScreen from '../components/Map';
import LocationInfoBottom from '../components/LocationInfoBottom';
import places from '../placesDetails';

export default class FullMapScreen extends React.Component {

  state = {
    showDetails: false,
    place: {}
  }

  setDetails = (place) => {
    this.setState({ place, showDetails: true });
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <MapScreen places={places} clickPlace={this.setDetails}></MapScreen>
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