import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class Kosdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datakos: "",
            idkos: this.props.navigation.state.params.idkos
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/kos/" + this.state.idkos + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datakos: data
                        });
                        console.log(this.state.datakos);

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
        let KategoriKosString=""+this.state.datakos.KategoriKos;
        if(KategoriKosString=="Kelas1"){
            KategoriKosString="Elite";
        } else if(KategoriKosString=="Kelas2"){
            KategoriKosString="Menengah";
        } else if(KategoriKosString=="Kelas3"){
            KategoriKosString="Ekonomis";
        }
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: "#1b1b2b" }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("Kos")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>DETAILKos</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Separator bordered>
                        <Text  style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakos.KdKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Nama Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakos.NamaKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Kategori Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{KategoriKosString}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Jumlah Kamar</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakos.JmlKamar}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Lokasi</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakos.Location}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text  style={styles.text}>Pendapatan</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datakos.Pendapatan}</Text>
                    </ListItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Kosedit", { idkos: this.state.datakos._id })} key={this.state.datakos._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button rounded danger onPress={this.Deletekos}>
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

    Deletekos = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Delete Data kos',
                    'Delete Data?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                return fetch("https://kosannarutosasuke.herokuapp.com/api/kos/" + this.state.datakos._id + "?token=" + this.state.webtoken, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then(
                                    Alert.alert(
                                        'Delete Data kos',
                                        'Delete Success',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Kos') },
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
