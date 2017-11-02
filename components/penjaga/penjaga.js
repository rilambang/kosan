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

export default class Penjaga extends Component {

  constructor() {
    super()
    this.state = {
      datapenjaga: [],
      webtoken: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (error, result) => {
      //console.log("AsyncStorage")
      if (result) {
        this.setState({
          webtoken: result
        });
        console.log(this.state.webtoken)
        fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga?token=" + this.state.webtoken, {
          method: "GET"
        })

          //promise
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.setState({
              datapenjaga: data
            });
            //debugger;
            console.log(data[0].NamaPenjaga);

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
      <Container>
        <Content padder>
          <List>
            <Text style={{ color: '#000', fontSize: 20, textAlign: "center" }}>Nama Penjaga</Text>
            {
              this.state.datapenjaga.map((item, index) => (
                <Card>

                  {/*<Button block info onPress={() => this.props.navigation.navigate("PenggunaDetail", { idPengguna: item._id })} >*/}
                  <Text >{item.NamaPenjaga}</Text>
                  {/*</Button>*/}

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