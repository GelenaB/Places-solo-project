import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class PlacePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      'name': 'Sagrada Familia',
      "accuracy": 100,
      "altitude": 0,
      "latitude": 41.4035945,
      "longitude": 2.1743616,
      'image': [{
        'url': 'https://instagram.fbcn1-1.fna.fbcdn.net/vp/1f3c70f9494d8aa6987044131fec207f/5D381ABE/t51.2885-15/e35/56573623_2210990905603177_2531192974331423388_n.jpg?_nc_ht=instagram.fbcn1-1.fna.fbcdn.net',
        'author': 'rzyhaano'
      },
      {
        'url': 'https://instagram.fbcn1-1.fna.fbcdn.net/vp/c361541b779e101578930971fbc01c4a/5D7368CD/t51.2885-15/e35/57239225_447969315939306_7830821202832782646_n.jpg?_nc_ht=instagram.fbcn1-1.fna.fbcdn.net',
        'author': 'viagencia'
      },
      ]
    } // this is a test object which would be a passed prop
  }

  render () {
    return (
      <View style={styles.container}>

        <Image source={{ uri: this.props.place.image[0].url }}
          style={styles.image} />

        <View style={styles.description}>
          <Text style={[styles.text, styles.title]}>{this.props.place.name}</Text>
          <Text style={styles.text}>I'm some random text</Text>
        </View>

        <Button title='more' onPress={() => this.props.navigation.navigate('Place')}> </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})