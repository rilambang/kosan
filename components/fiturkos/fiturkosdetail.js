import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class fiturkosdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datafiturkos: "",
            TV: "",
            Kulkas: "",
            idfiturkos: this.props.navigation.state.params.idfiturkos
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos/" + this.state.idfiturkos + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datafiturkos: data,
                        });
                        //console.log(this.state.datafiturkos.TV)
                        if (this.state.datafiturkos.TV == false) {
                            this.setState({
                                TV: "Tidak Ada"
                            });
                        } else {
                            this.setState({
                                TV: "Ada"
                            });
                        }
                        if (this.state.datafiturkos.Kulkas == false) {
                            this.setState({
                                Kulkas: "Tidak Ada"
                            });
                        } else {
                            this.setState({
                                Kulkas: "Ada"
                            });
                        }

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
                            onPress={() => this.props.navigation.navigate("Fiturkos")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>DETAILFiturkos</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Separator bordered>
                        <Text style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datafiturkos.KdKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Biaya Internet</Text>
                    </Separator>
                    <ListItem >
                        <Text>Rp. {this.state.datafiturkos.Internet}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Biaya Air</Text>
                    </Separator>
                    <ListItem >
                        <Text>Rp. {this.state.datafiturkos.Air}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Biaya Listrik</Text>
                    </Separator>
                    <ListItem >
                        <Text>Rp. {this.state.datafiturkos.Listrik}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Kamar Mandi</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datafiturkos.KamarMandi}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>TV</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.TV}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Kulkas</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.Kulkas}</Text>
                    </ListItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Fiturkosedit", { idfiturkos: this.state.datafiturkos._id })} key={this.state.datafiturkos._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button rounded danger onPress={this.Deletefiturkos}>
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

    Deletefiturkos = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Delete Data fiturkos',
                    'Yakin?',
                    [
                        { text: 'Batal', style: 'cancel' },
                        {
                            text: 'YA', onPress: () => {
                                fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos/" + this.state.datafiturkos._id + "?token=" + this.state.webtoken, {
                                    method: "GET"
                                })
                                    //promise
                                    .then((response) => response.json())
                                    .then((data) => {
                                        let a = Number(data.Internet) + Number(data.Listrik) + Number(data.Air)
                                        if (data.TV == true) {
                                            a = a + 100000;
                                        }
                                        if (data.Kulkas == true) {
                                            a = a + 100000;
                                        }
                                        if (data.KamarMandi == "Dalam") {
                                            a = a + 100000;
                                        }
                                        //console.log(data.KdKos)
                                        fetch("https://kosannarutosasuke.herokuapp.com/api/kos/kode/" + data.KdKos + "?token=" + this.state.webtoken, {
                                            method: "GET"
                                        })
                                            //promise
                                            .then((response) => response.json())
                                            .then((data) => {
                                                let Hasil = 0;
                                                Hasil = Number(data[0].Pendapatan) + a;
                                                console.log(Hasil);
                                                fetch("https://kosannarutosasuke.herokuapp.com/api/kos/" + data[0]._id + "?token=" + this.state.webtoken, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        Pendapatan: Hasil,
                                                    })
                                                })
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                        fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos/" + this.state.datafiturkos._id + "?token=" + this.state.webtoken, {
                                            method: "DELETE"
                                        })
                                            .then((response) => response.json())
                                            .then(
                                            Alert.alert(
                                                'Delete Data fiturkos',
                                                'Delete Sukses',
                                                [
                                                    { text: 'OK', onPress: () => this.props.navigation.navigate('Fiturkos') },
                                                ]
                                            )
                                            )

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
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
