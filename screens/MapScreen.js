import React from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, TouchableOpacity } from "react-native";
import { MapView, Location, Permissions } from 'expo';
import Places from '../PlacesDBSimulator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapStyle from '../mapStyle/MapStyle';

const userMarker = require('../assets/markers/maps-and-flags.png')
const { width, height } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = 270;

export default class screens extends React.Component {
  state = { region: null };

  marker = <Ionicons style={{ paddingRight: 25 }} name='ios-list-box' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('List') }}></Ionicons>

  handleMarkerPress = (e) => {
    this.scroll.getNode().scrollTo({ x: e * 270, y: 0, animated: true });
  }

  handlePlacePress = (place) => {
    this.props.navigation.navigate(
      'Place',
      { place: place }
    );
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight:
      <Ionicons style={{ paddingRight: 25 }} name='ios-list-box' size={30} color='rgba(130,4,150, 0.9)' onPress={() => { navigation.navigate('List') }}></Ionicons>,
    title: 'Barcelona',
  });
  // function is getting an object of 'things', which we're destructuring to get the navigation

  _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let region = await Location.getCurrentPositionAsync({});
    // let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];
    // use this if need lat & long coords of location

    let userLocationDetails = (await Location.reverseGeocodeAsync(region.coords))[0]; // if not with bracket it will be undefined

    this.setState({
      region,
      userLocationDetails,
    });
  };

  componentWillMount () {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount () {
    this._getLocationAsync();
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / cardWidth + 0.3); // animate 30% away from landing on the next item
      if (index >= Places.length) {
        index = Places.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { latitude, longitude } = Places[index];
          this.map.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            350
          );
        }
      }, 10);
    });
  }

  render () {
    if (!this.state.region) {
      return (<View />) // if not loaded empty screen
    }
    const interpolations = Places.map((place, index) => {
      const inputRange = [
        (index - 1) * cardWidth,
        index * cardWidth,
        ((index + 1) * cardWidth),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>

        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          ref={map => this.map = map}
          customMapStyle={MapStyle}
          initialRegion={{
            latitude: this.state.region.coords.latitude,
            longitude: this.state.region.coords.longitude,
            latitudeDelta: 0.0922, // zoom
            longitudeDelta: 0.0421
          }}
          style={styles.container}>

          {Places.map((place, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker
                key={index}
                coordinate={place}
                onPress={() => this.handleMarkerPress(index)} >
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.place} />
                </Animated.View>
              </MapView.Marker>
            );
            // in order to render custom markers on the screen, need to render them as children of MapView.Marker
            // double check - moving circle doesn't work with G Maps provider
            // double check - if markers can be in separate component file
          })}

          <MapView.Marker coordinate={this.state.region.coords}
            image={userMarker} />

        </MapView>

        <Animated.ScrollView
          horizontal
          ref={(c) => { this.scroll = c }}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={true}
          snapToInterval={cardWidth} // ios only property
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animation, }, }, },], { useNativeDriver: true })}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding} // to allow to scroll pass the last item
        >
          {Places.map((place, index) => (
            <TouchableOpacity onPress={() => { this.handlePlacePress(place) }} style={styles.card} key={index}>
              <Image
                source={place.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text style={styles.cardtitle}>{place.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - cardWidth,
  },
  card: {
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: cardHeight,
    width: cardWidth,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 0.8,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    alignSelf: 'center',
    color: '#383838',
  },
  placeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  place: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  // ring: {
  //   width: 24,
  //   height: 24,
  //   borderRadius: 12,
  //   backgroundColor: "rgba(130,4,150, 0.3)",
  //   position: "absolute",
  //   borderWidth: 1,
  //   borderColor: "rgba(130,4,150, 0.5)",
  // },
});