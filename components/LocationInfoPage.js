import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


export default class LocationInfoBottom extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: 'Map'
  //   }
  // }

  render () {
    console.log()
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image source={{ uri: this.props.place.image[0].url }}
          style={styles.image} />

        <View style={styles.description}>
          <Text style={[styles.text, styles.title]}>{this.props.place.name}</Text>
          <Text style={styles.text}>I'm some random text</Text>
        </View>

        <Button title='more' onPress={() => this.props.navigate.navigate('Place')}> </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    padding: 5,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 'auto',
    width: 100,
  },
  description: {
    flex: 3,
    paddingLeft: 10,
  },
  text: {
    flexDirection: 'column',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',

  }
})