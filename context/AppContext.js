import React from 'react';
import { Location, Permissions } from 'expo';
import firebaseDatabase from '../firebase/FirebaseDatabase';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      places: [],
      region: null,
      userLocationDetails: null,
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const region = await Location.getCurrentPositionAsync({});
    // let sagrada = (await Location.geocodeAsync('Carrer de Mallorca, 401, 08013 Barcelona'))[0];
    // use this if need lat & long coords of location

    const userLocationDetails = (await Location.reverseGeocodeAsync(region.coords))[0]; // if not with bracket it will be undefined

    this.setState({
      region,
      userLocationDetails,
    });
  };

  distanceCalculator = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km (change this constant to get miles)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    if (d > 1) return Math.round(d);
    else if (d <= 1) return Math.round(d * 1000);
    return d;
  }

  componentDidMount () {
    firebaseDatabase.ref().on('value', (snapshot) => {
      const data = (snapshot.val());
      data.map(place => {
        let distance = this.distanceCalculator(this.state.region.coords.latitude, this.state.region.coords.longitude, place.latitude, place.longitude);
        place.distanceAway = distance;
      });
      this.setState({ places: data });
      console.log(this.state.places)
    });

    this._getLocationAsync();

  }

  render () {
    return (
      <AppContext.Provider value={{
        places: this.state.places,
        region: this.state.region,
        userLocationDetails: this.state.userLocationDetails,
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}