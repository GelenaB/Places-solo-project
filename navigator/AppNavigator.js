import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import PlaceScreen from '../screens/PlaceScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Place: PlaceScreen,
    List: ListScreen,
    Map: MapScreen,

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: 'rgba(130,4,150, 0.9)',
      headerStyle: {
        backgroundColor: '#fff',
      }
    }
  }
)

const AppNavigator = createAppContainer(navigator);

export default AppNavigator;