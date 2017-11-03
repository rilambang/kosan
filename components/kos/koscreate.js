import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class KosCreate extends Component {
    constructor() {
        super()
        this.state = {
            KdKos: "",
            NamaKos: "",
            Lokasi: "",
            JmlKamar:"",
            KategoriKos: "",
            Pendapatan: ""
        }
    }

    render() {
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>TAMBAHKos</Text>
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
                                        <H1>Data kos{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput defaultValue={this.state.datakos.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama Kos </Text>
                                        <TextInput defaultValue={this.state.datakos.NamaKos} onChangeText={this.handleNamaKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kategori Kos </Text>
                                        <TextInput defaultValue={this.state.datakos.KategoriKos} onChangeText={this.handleKategoriKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Lokasi </Text>
                                        <TextInput defaultValue={this.state.datakos.Location} onChangeText={this.handleLocation}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Jumlah Kamar </Text>
                                        <TextInput defaultValue={this.state.datakos.JmlKamar} onChangeText={this.handleJmlKamar}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Pendapatan </Text>
                                        <TextInput defaultValue={this.state.datakos.Pendapatan} editable={false} onChangeText={this.handlePendapatan}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editkos}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    createkos = () => {
        if (this.state.KategoriKos == "" || this.state.KdKos == "" || this.state.NamaKos == "" || this.state.JmlKamar == "" || this.state.Location == "") {

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
                    fetch("https://kosannarutosasuke.herokuapp.com/api/kos?token=" + this.state.webtoken, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            this.setState({
                                dataKos: data
                            });
                            //debugger;
                            //console.log(this.state.dataKos);
                            //console.log(this.state.dataDokter[0].NamaDokter);

                        })
                        .catch((error) => {
                            //console.log(error);
                        })
                }
                else if (error) {
                    console.log('eror' + error)
                }

                return fetch("https://kosannarutosasuke.herokuapp.com/api/kos?token=" + this.state.webtoken, {
                    method: 'POST',

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        KdKos: this.state.KdKos,
                        NamaKos: this.state.NamaKos,
                        Location: this.state.Location,
                        KategoriKos: this.state.KategoriKos,
                        JmlKamar: this.state.JmlKamar,
                    })
                })
                    .then(response => response.json())
                    .then(
                    Alert.alert(
                        "Create Provinsoi",
                        "Sukses",
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Kos') },
                        ]
                    )
                    )
            })
        }
    }

    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }
    handleNamaKos = (text) => {
        this.setState({ NamaKos: text })
    }
    handleLocation = (text) => {
        this.setState({ Location: text })
    }
    handleKategoriKos = (text) => {
        this.setState({ KategoriKos: text })
    }
    handleJmlKamar = (text) => {
        this.setState({ JmlKamar: text })
    }
    handlePendapatan = (text) => {
        this.setState({ Pendapatan: text })
    }

}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})