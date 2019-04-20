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
    initialRouteName: 'List',
    // navigationOptions: {
    //   headerTintColor: "#a41034",
    //   headerStyle: {
    //     backgroundColor: "#fff"
    //   }
    // }
  }
)

// const PlacesViewNavigator = createSwitchNavigator(
//   {

//     Home: HomeScreen,
//     Place: PlaceScreen,
//     List: ListScreen,
//   },

// )

const App = createAppContainer(AppNavigator);

// do not render navigator inside a screen !!

// export default class App extends React.Component { 

//   render () {
//     return (
//       // <AppNavigator />
//       <View style={styles.container}>
//         <Text>This is the test screen</Text>
//       </View>
//     )
//   }
// };

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
