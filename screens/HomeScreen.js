import React from 'react';
import { StyleSheet, View, Button, ImageBackground } from 'react-native';

const image = 'https://instagram.fbcn1-1.fna.fbcdn.net/vp/e195c2a7df1f40f38c491271605f241f/5D562874/t51.2885-15/e35/57360423_134523877624869_3704443088468485338_n.jpg?_nc_ht=instagram.fbcn1-1.fna.fbcdn.net';

export default class HomeScreen extends React.Component {

  render () {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={{ uri: image }} style={styles.container}>
        <View style={styles.title}>
          <Button title='Explore Barcelona' onPress={() => navigate('Map')} color='#fff' />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  title: {
    margin: 40,
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: "rgba(130,4,150, 0.5)",
    color: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});