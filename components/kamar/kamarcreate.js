import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, AsyncStorage, Picker, PickerItem, TouchableOpacity, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class KamarCreate extends Component {
    constructor() {
        super()
        this.state = {
            KdKos: "",
            KdKamarKos: "",
            AC: "",
            CuciPakaian: "",
            Tagihan: "",
            BuktiTagihan: "",

        }
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>TAMBAHKamar</Text>
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
                                        <H1>Data kamar{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} defaultValue={this.state.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} defaultValue={this.state.KdKamarKos} onChangeText={this.handleKdKamarKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>AC </Text>
                                        <Picker selectedValue={this.state.AC} onValueChange={this.handleAC}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Ada" value="true" />
                                            <Picker.Item label="Tidak" value="false" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Cuci Pakaian </Text>
                                        <Picker selectedValue={this.state.CuciPakaian} onValueChange={this.handleCuciPakaian}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Ada" value="true" />
                                            <Picker.Item label="Tidak" value="false" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Tagihan </Text>
                                        <TextInput style={{ marginRight: -100 }} keyboardType='numeric' defaultValue={this.state.Tagihan} onChangeText={this.handleTagihan}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Bukti Tagihan </Text>
                                        <TextInput style={{ marginRight: -100 }} defaultValue={this.state.BuktiTagihan} onChangeText={this.handleBuktiTagihan}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.createkamar}><Text>Simpan</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }

    createkamar = () => {
        if (this.state.KdKos == "" || this.state.KdKamarKos == "" || this.state.AC == "" ||
            this.state.Tagihan == "" || this.state.CuciPakaian == "" || this.state.BuktiTagihan == "") {
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
                    fetch("https://kosannarutosasuke.herokuapp.com/api/kamar?token=" + this.state.webtoken, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            this.setState({
                                dataKamar: data
                            });
                            //debugger;
                            //console.log(this.state.dataKamar);
                            //console.log(this.state.dataDokter[0].NamaDokter);

                        })
                        .catch((error) => {
                            //console.log(error);
                        })
                }
                else if (error) {
                    console.log('eror' + error)
                }

                return fetch("https://kosannarutosasuke.herokuapp.com/api/kamar?token=" + this.state.webtoken, {
                    method: 'POST',

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        KdKos: this.state.KdKos,
                        KdKamarKos: this.state.KdKamarKos,
                        AC: this.state.AC,
                        Tagihan: this.state.Tagihan,
                        CuciPakaian: this.state.CuciPakaian,
                        BuktiTagihan: this.state.BuktiTagihan
                    })
                })
                    .then(response => response.json())
                    .then(
                    Alert.alert(
                        "Tambah Kamar",
                        "Sukses",
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Kamar') },
                        ]
                    )
                    )
            })
        }
    }

    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }

    handleKdKamarKos = (text) => {
        this.setState({ KdKamarKos: text })
    }
    handleAC = (text) => {
        this.setState({ AC: text })
    }
    handleTagihan = (text) => {
        this.setState({ Tagihan: text })
    }
    handleCuciPakaian = (text) => {
        this.setState({ CuciPakaian: text })
    }
    handleBuktiTagihan = (text) => {
        this.setState({ BuktiTagihan: text })
    }


}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})