import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Login from './components/login/index.js';
import Home from './components/content/index.js';


const ApplicationLogin = StackNavigator({
  Login: { screen: Login },
}, {
    navigationOptions: {
      header: false,
    }
  })

const ApplicationHome = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
}, {
    navigationOptions: {
      header: false,
    }
  })

export default class App extends Component {
  state = {
    'data': ''
  }
  componentDidMount = () => AsyncStorage.getItem('data', (error, token) => {
    if (token) {
      this.setState({
        token: token
      });
      console.log(this.state.token)
    }
    else if (error) {
      console.log('eror' + error)
    }
  })
    .then((token) => this.setState({ 'data': token }))

  async componentWillMount() {

    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });

  }

  render() {
    if (this.state.token != null || this.state.token != undefined || this.state.token != "") {
      return (
        <ApplicationHome />
      );
    } else {
      return (
        <ApplicationLogin />
      );
    }

  }
}