import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class LocationInfoBottom extends React.Component {


  render () {
    return (
      <View style={styles.container}>
        <Image source={{ uri: 'https://instagram.fbcn1-1.fna.fbcdn.net/vp/10b189745066b6c4ee0bfda51b7577d4/5D561379/t51.2885-15/e35/54277634_650366165402683_1539840855740801752_n.jpg?_nc_ht=instagram.fbcn1-1.fna.fbcdn.net' }}
          style={{ width: 100, height: 100 }} />
        <Text style={{ flexWrap: 'wrap' }}>Im some info that needs to be hidden but I don't work when placed in flex row</Text>
        <Text>I want to be extra info but I'm not visible with flex row</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'space-between',
  }
})