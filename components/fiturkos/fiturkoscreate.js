import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, AsyncStorage, Picker, PickerItem, TouchableOpacity, Switch, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class fiturkosCreate extends Component {
    constructor() {
        super()
        this.state = {
            Internet: "",
            KdKos: "",
            Air: "",
            KamarMandi: "",
            TV: false,
            Kulkas: false,
            Listrik: "",
        }
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>TAMBAHFiturkos</Text>
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
                                        <H1>Data fiturkos{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} defaultValue={this.state.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Biaya Internet </Text>
                                        {/*<TextInput style={{ marginRight: -100 }} defaultValue={this.state.Internet} onChangeText={this.handleInternet}></TextInput>*/}
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Internet(text)}
                                            value={this.state.Internet}
                                        />
                                        <Text style={{ fontSize: 20 }}>Biaya Air </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Air(text)}
                                            value={this.state.Air}
                                        />
                                        <Text style={{ fontSize: 20 }}>Biaya Listrik </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Listrik(text)}
                                            value={this.state.Listrik}
                                        />
                                        <Text style={{ fontSize: 20 }}>Kulkas </Text><Switch onValueChange={this.handleKulkas} value={this.state.Kulkas} />
                                        <Text style={{ fontSize: 20 }}>TV </Text><Switch onValueChange={this.handleTV} value={this.state.TV} />
                                        <Text style={{ fontSize: 20 }}>Kamar Mandi</Text>
                                        <Picker style={{ marginRight: -100 }} selectedValue={this.state.KamarMandi} onValueChange={this.handleKamarMandi}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Dalam" value="Dalam" />
                                            <Picker.Item label="Luar" value="Luar" />
                                        </Picker>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.createfiturkos}><Text>Simpan</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }

    Listrik(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Ini dengan nomor");
            }
            this.setState({ Listrik: newText });
        }
    }
    Internet(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Ini dengan nomor");
            }
            this.setState({ Internet: newText });
        }
    }
    Air(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Ini dengan nomor");
            }
            this.setState({ Air: newText });
        }
    }

    createfiturkos = () => {
        console.log(this.state.Internet);
        if (this.state.KdKos == "") {
            Alert.alert(
                "Data Kosong",
                "Isi Semua Data",
                [
                    { text: "OK" },
                ]
            )
        } else {

            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos?token=" + this.state.webtoken, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            this.setState({
                                datafiturkos: data
                            });
                            //debugger;
                            //console.log(this.state.datafiturkos);
                            //console.log(this.state.dataDokter[0].NamaDokter);

                        })
                        .catch((error) => {
                            //console.log(error);
                        })
                }
                else if (error) {
                    console.log('eror' + error)
                }

                return fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos?token=" + this.state.webtoken, {
                    method: 'POST',

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        KdKos: this.state.KdKos,
                        Internet: this.state.Internet,
                        TV: this.state.TV,
                        KamarMandi: this.state.KamarMandi,
                        Air: this.state.Air,
                        Kulkas: this.state.Kulkas,
                        Listrik: this.state.Listrik,
                    })
                })
                    .then(response => response.json())
                    .then(
                    Alert.alert(
                        "Tambah Fiturkos",
                        "Sukses",
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Fiturkos') },
                        ]
                    )
                    )
            })
        }
    }

    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }
    handleTV = (text) => {
        this.setState({ TV: text })
    }
    handleKamarMandi = (text) => {
        this.setState({ KamarMandi: text })
    }
    handleKulkas = (text) => {
        this.setState({ Kulkas: text })
    }



}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})