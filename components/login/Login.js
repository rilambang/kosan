import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  StatusBar
} from 'react-native';

export default class HomeLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: "",
      Password: "",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoConten}>
          <Image
             style = {styles.logo}
             source={require('../../assets/images/logo.png')} />
          {/*<Text style={styles.titleApp}>Kosan Kita</Text>*/}
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.containerkey}>
          <StatusBar
            barStyle="light-content"
          />
          <TextInput
            defaultValue={this.state.Username} onChangeText={this.handleUsername}
            placeholder="Username or email"
            placeholderTextColor='#cccccc'
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            style={styles.input}>
          </TextInput>

          <TextInput
            defaultValue={this.state.Password} onChangeText={this.handlePassword}
            placeholder="Password"
            placeholderTextColor='#cccccc'
            secureTextEntry
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            style={styles.input}>
          </TextInput>

          <TouchableOpacity primary onPress={this.ProsesLogin} style={styles.buttonContainer}>
            <Text style={styles.loginbutton}>LOGIN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

  ProsesLogin = () => {
    return fetch("https://kosannarutosasuke.herokuapp.com/api/login/authenticate", {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: this.state.Username,
        Password: this.state.Password,
      })
    })
      .then(response => response.json())
      .then((token) => {
        AsyncStorage.setItem('token', JSON.stringify(token.token));
        if (token.token != undefined) {
          //console.log(token.token)
          Alert.alert(

            "Login",
            "Sukses",
            [
              { text: "OK", onPress: () => this.props.navigation.navigate('Home') },
            ]
          )
          this.props.navigation.navigate('Home')
        }
        else {
          //console.log(token.token)
          Alert.alert(

            "Login",
            "Gagal",
            [
              { text: "OK", onPress: () => this.props.navigation.navigate('Login') },
            ]
          )
        }
      })

  }

  handleUsername = (text) => {
    this.setState({ Username: text })
  }
  handlePassword = (text) => {
    this.setState({ Password: text })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#255d71',
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
    width: 160,
    height: 160
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerkey: {
    padding: 20
  },
  input: {
    minWidth: 300,
    flexWrap: 'wrap',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "#1980b9",
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 20
  },
  loginbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700'
  }
});