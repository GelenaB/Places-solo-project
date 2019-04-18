import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Explore'
    }
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Your current location"
          onPress={() => navigate('LocalMap')}
        />
        <Button
          title="Madrid"
          onPress={() => navigate('LocalMap')}
        />
        <Button
          title="Barcelona"
          onPress={() => navigate('LocalMap')}
        />
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