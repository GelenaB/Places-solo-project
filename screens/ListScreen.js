import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../context/AppContext';
import ListItem from '../components/ListItem';

export default class ListScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = ({
      region: null,
    })
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ paddingRight: 25 }} name='ios-pin' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('Map') }}></Ionicons>
  });

  render () {
    // if (!this.state.region) {
    //   return (<View />) // if not loaded empty screen
    // }
    return (
      <AppContext.Consumer>
        {(value) => (
          <ScrollView style={styles.container}>
            {value.places.map(place => <ListItem navigate={this.props.navigation} key={place.name} place={place} />)}
          </ScrollView>
        )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

// distance={this.distance(this.state.region.coords.latitude, this.state.region.coords.longitude, place.latitude, place.longitude)}