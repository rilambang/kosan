import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, AsyncStorage, keyboardType, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class gajiedit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idgaji: this.props.navigation.state.params.idgaji,
            datagaji: "",
            Gaji: "",
            KategoriKos: "",

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/GajiPenjaga/" + this.state.idgaji + "?token=" + this.state.webtoken, {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datagaji: data,
                            Gaji: data.Gaji,
                            KategoriKos: data.KategoriKos,
                        });
                        console.log(data.Gaji);

                        //debugger;


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
                            onPress={() => this.props.navigation.navigate("Gajidetail", { idgaji: this.state.datagaji._id })} key={this.state.datagaji._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITGaji</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>

                                <List>

                                    <View >
                                        <H1>Data Gaji Penjaga{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kategori Kos {this.state.datagaji.KategoriKos}</Text>
                                        <Text style={{ fontSize: 20 }}>Gaji </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Gaji(text)}
                                            value={this.state.Gaji}
                                        />
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editgaji}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    editgaji = () => {
        if (this.state.KategoriKos == "" || this.state.Gaji == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Gajiedit', { idgaji: this.state.datagaji._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/GajiPenjaga/" + this.state.idgaji + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Gaji: this.state.Gaji,
                            KategoriKos: this.state.KategoriKos,
                        })
                    })
                        .then(response => response.json())
                        .then(
                        Alert.alert(
                            "Edit Data Gaji",
                            "Berhasil",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Gajidetail', { idgaji: this.state.datagaji._id }) },
                            ]
                        )
                        )
                }
                else if (error) {
                    console.log('eror' + error)
                }
            })
        }
    }

    Gaji(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Isi Dengan Nomor");
            }
            this.setState({ Gaji: newText });
        }
    }
    handleKategoriKos = (text) => {
        this.setState({ KategoriKos: text })
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