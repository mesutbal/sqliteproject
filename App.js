import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

/* Screens */
import HomeScreen from './src/screens/home/HomeScreen';


const stack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title : 'Üyelik Sistemi'
    }
  }
},{
  headerLayoutPreset : 'center'
});


const App = createAppContainer(stack);

export default App;
