import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class Penghunidetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datapenghuni: "",
            idpenghuni: this.props.navigation.state.params.idpenghuni
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni/" + this.state.idpenghuni + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datapenghuni: data
                        });
                        console.log(this.state.datapenghuni);

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
                            onPress={() => this.props.navigation.navigate("Penghuni")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>DETAILPenghuni</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.KdKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kamar Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.KdKamarKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Nama Penghuni</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.NamaPenghuni}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Tanggal Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.TGLKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>No KTP</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.NoKTP}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>No. Handphone</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.NoHP}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Nama Bank</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenghuni.NamaBank}</Text>
                    </ListItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Penghuniedit", { idpenghuni: this.state.datapenghuni._id })} key={this.state.datapenghuni._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button rounded danger onPress={this.Deletepenghuni}>
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

    Deletepenghuni = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Delete Data penghuni',
                    'Delete Data?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                return fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni/" + this.state.datapenghuni._id + "?token=" + this.state.webtoken, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then(
                                    Alert.alert(
                                        'Delete Data penghuni',
                                        'Delete Success',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Penghuni') },
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
