import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Login from './components/login/Login.js';
import Home from './components/content/index.js';


const Application = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
}, {
    navigationOptions: {
      header: false,
    }
  })

export default class App extends Component {
  async componentWillMount() {

    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });

  }

  render() {
    return (
      <Application />
    );
  }
}