import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class Penjagadetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datapenjaga: "",
            idpenjaga: this.props.navigation.state.params.idpenjaga
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga/" + this.state.idpenjaga + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datapenjaga: data
                        });
                        console.log(this.state.datapenjaga);

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
                            onPress={() => this.props.navigation.navigate("Penjaga")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>PENJAGADetail</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Penjaga</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.KdPenjaga}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.KdKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Nama Penjaga</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.NamaPenjaga}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Jenis Kelamin</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.JenisKelamin}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Kategori Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.KategoriKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>No. Handphone</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.NoHp}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Alamat</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datapenjaga.Alamat}</Text>
                    </ListItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Penjagaedit", { idpenjaga: this.state.datapenjaga._id })} key={this.state.datapenjaga._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button rounded danger onPress={this.Deletepenjaga}>
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

    Deletepenjaga = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Delete Data penjaga',
                    'Delete Data?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                return fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga/" + this.state.datapenjaga._id + "?token=" + this.state.webtoken, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then(
                                    Alert.alert(
                                        'Delete Data penjaga',
                                        'Delete Success',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Penjaga') },
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
