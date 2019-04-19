import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cities: [
        'Your current location',
        'Barcelona',
        'Madrid',
        'Seville',
        'Granada',
        'Valencia',
        'Córdoba',
      ],
      place: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Explore',
    }
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.cities.map(city => <Button key={city} title={city} onPress={() => navigate('NewMap')} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});