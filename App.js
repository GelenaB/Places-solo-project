import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import PlaceScreen from './screens/PlaceScreen';
import ListScreen from './screens/ListScreen';
import NewMap from './screens/NewMap';


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Place: PlaceScreen,
    List: ListScreen,
    NewMap: NewMap,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor: 'rgba(130,4,150, 0.9)',
      headerStyle: {
        backgroundColor: "#fff"
      }
    }
  }
)

const App = createAppContainer(AppNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
