import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class Kamardetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datakamar: "",
            idkamar: this.props.navigation.state.params.idkamar
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/kamar/" + this.state.idkamar + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datakamar: data
                        });
                        console.log(this.state.datakamar);

                    })
                    .catch((error) => {
                        console.log(error);
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
                            onPress={() => this.props.navigation.navigate("Kamar")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>DETAILKamar</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.KdKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kamar Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.KdKamarKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>AC</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.AC}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Cuci Pakaian</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.CuciPakaian}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Tagihan</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.Tagihan}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Bukti Tagihan</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakamar.BuktiTagihan}</Text>
                    </ListItem>
                   
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Kamaredit", { idkamar: this.state.datakamar._id })} key={this.state.datakamar._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button rounded danger onPress={this.Deletekamar}>
                                    <Icon name="trash" />
                                    <Text>Delete</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    Deletekamar = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Delete Data kamar',
                    'Delete Data?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                return fetch("https://kosannarutosasuke.herokuapp.com/api/kamar/" + this.state.datakamar._id + "?token=" + this.state.webtoken, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then(
                                    Alert.alert(
                                        'Delete Data kamar',
                                        'Delete Success',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Kamar') },
                                        ]
                                    )
                                    )
                            }
                        }
                    ]
                )

            }
            else if (error) {
                console.log('eror' + error)
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})
