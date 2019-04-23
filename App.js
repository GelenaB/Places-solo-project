import React from 'react';
import { firebaseDatabase } from './firebase/FirebaseConfig';
import { firebaseConfig } from './firebase/FirebaseConfig';
import AppNavigator from './navigator/AppNavigator.js';
import * as firebase from 'firebase';
import { AppProvider } from './context/AppContext';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}

    // Initialise Firebase
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig.FirebaseConfig); }
  }

  render () {
    return (
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    )
  }
}



