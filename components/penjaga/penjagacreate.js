import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class PenjagaCreate extends Component {
    constructor() {
        super()
        this.state = {
            KdPenjaga: "",
            KdKos: "",
            NamaPenjaga: "",
            JenisKelamin: "",
            Alamat: "",
            NoHp: "",
            KategoriKos: "",
        }
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>TAMBAHPenjaga</Text>
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
                                        <H1>Data penjaga{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Penjaga </Text>
                                        <TextInput defaultValue={this.state.KdPenjaga} onChangeText={this.handleKdPenjaga}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput defaultValue={this.state.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama penjaga </Text>
                                        <TextInput defaultValue={this.state.NamaPenjaga} onChangeText={this.handleNamaPenjaga}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Jenis Kelamin </Text>
                                        <TextInput defaultValue={this.state.JenisKelamin} onChangeText={this.handleJenisKelamin}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Alamat </Text>
                                        <TextInput defaultValue={this.state.Alamat} onChangeText={this.handleAlamat}></TextInput>
                                        <Text style={{ fontSize: 20 }}>No Hp </Text>
                                        <TextInput defaultValue={this.state.NoHp} onChangeText={this.handleNoHp}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kategori Kos </Text>
                                        <TextInput defaultValue={this.state.KategoriKos} onChangeText={this.handleKategoriKos}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.createpenjaga}><Text>Simpan</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    createpenjaga = () => {
        if (this.state.KategoriKos == "" || this.state.KdPenjaga == "" || this.state.KdKos == "" ||
            this.state.NamaPenjaga == "" || this.state.Alamat == "" || this.state.JenisKelamin == "" ||
            this.state.NoHp == "") {
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
                    fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga?token=" + this.state.webtoken, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            this.setState({
                                dataPenjaga: data
                            });
                            //debugger;
                            //console.log(this.state.dataPenjaga);
                            //console.log(this.state.dataDokter[0].NamaDokter);

                        })
                        .catch((error) => {
                            //console.log(error);
                        })
                }
                else if (error) {
                    console.log('eror' + error)
                }

                return fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga?token=" + this.state.webtoken, {
                    method: 'POST',

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        KdKos: this.state.KdKos,
                        Alamat: this.state.Alamat,
                        NoHp: this.state.NoHp,
                        KdPenjaga: this.state.KdPenjaga,
                        JenisKelamin: this.state.JenisKelamin,
                        KategoriKos: this.state.KategoriKos,
                        NamaPenjaga: this.state.NamaPenjaga,
                    })
                })
                    .then(response => response.json())
                    .then(
                    Alert.alert(
                        "Create Provinsoi",
                        "Sukses",
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Penjaga') },
                        ]
                    )
                    )
            })
        }
    }

    handleKdPenjaga = (text) => {
        this.setState({ KdPenjaga: text })
    }
    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }
    handleNamaPenjaga = (text) => {
        this.setState({ NamaPenjaga: text })
    }
    handleAlamat = (text) => {
        this.setState({ Alamat: text })
    }
    handleNoHp = (text) => {
        this.setState({ NoHp: text })
    }
    handleJenisKelamin = (text) => {
        this.setState({ JenisKelamin: text })
    }
    handleKategoriKos = (text) => {
        this.setState({ KategoriKos: text })
    }


}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})