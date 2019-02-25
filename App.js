import React from 'react';
import { createStackNavigator } from 'react-navigation';

/* Screens */
import HomeScreen from './src/screens/home/HomeScreen';


const App = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title : 'Üyelik Sistemi'
    }
  }
},{
  headerLayoutPreset : 'center'
});

export default App;
