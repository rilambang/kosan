import React, { Component } from 'react';
import { Container, Card, CardItem, Content, Header, Title, Button, Left, Right, Body, Icon, List, ListItem } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default class Penghuni extends Component {

  constructor(props) {
    super(props)
    this.state = {
      datapenghuni: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('data', (error, result) => {
      if (result) {
        this.setState({
          webtoken: result
        });
        console.log(this.state.webtoken)
        fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni?token=" + this.state.webtoken, {
          method: "GET"
        })

          //promise
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.setState({
              datapenghuni: data
            });
            //debugger;
            console.log(data[0].NamaPenghuni);

          })
          .catch((error) => {
            //console.log(error);
          })
      }
      else if (error) {
        console.log('eror' + error)
      }
    })

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#1b1b2b" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>PENGHUNI</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("Penghunicreate")} >
              <Icon style={{fontSize:30}} name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <Text style={{ color: '#000', marginTop:25, fontSize: 20,fontWeight:'bold', textAlign: "center" }}>Nama Penghuni</Text>
            <Text/>
            {
              this.state.datapenghuni.map((item, index) => (
                <Card key={item._id}>

                  <Button block light onPress={() => this.props.navigation.navigate("Penghunidetail", { idpenghuni: item._id })} >
                    <Text >{item.NamaPenghuni}</Text>
                  </Button>

                </Card>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#cfe1fe',
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