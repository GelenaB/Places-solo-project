import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapScreen from '../components/Map';
import LocationInfoBottom from '../components/LocationInfoBottom'

export default class FullMapScreen extends React.Component {

  state = {
    showDetails: true,
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <MapScreen ></MapScreen>
        {this.state.showDetails && (<LocationInfoBottom></LocationInfoBottom>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})