import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import FullMapScreen from './screens/FullMapView';
import HomeScreen from './screens/Home';

const AppNavigator = createStackNavigator(
  {
    LocalMap: FullMapScreen, //switch navigation
    HomePageTrial: HomeScreen,
  },
  {
    initialRouteName: 'HomePageTrial',
  }
)

const App = createAppContainer(AppNavigator);

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
