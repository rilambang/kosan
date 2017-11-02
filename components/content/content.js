import React, { Component } from 'react';
import { Icon, Button } from 'native-base';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class ContentHome extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoConten}>
          {/*<Image
             style = {styles.logo}
             source={require('../images/ic_githug.png')} />*/}
          <Text style={styles.titleApp}>Selamat Datang</Text><Button
            transparent
            onPress={() => this.props.navigation.navigate("Penjaga")}>
            <Icon name="menu" />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B8057',
  },
  logoConten: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleApp: {
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  logo: {
    width: 100,
    height: 100
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});