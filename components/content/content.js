import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Container, Card, CardItem, Content, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
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
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#1b1b2b" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}>KOSKita</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          {/*<View style={styles.logoConten}>
          <Image style={styles.logo} source={require("../../assets/images/rumah.png")}></Image>
        </View>*/}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#92b8c5',
  },
  logoConten: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  titleApp: {
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  logo: {
    width: 200,
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});