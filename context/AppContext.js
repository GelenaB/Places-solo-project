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

  componentDidMount () {
    firebaseDatabase.ref().on('value', (snapshot) => {
      this.setState({ places: snapshot.val() })
    })
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