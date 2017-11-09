import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, DatePickerIOS, AsyncStorage, Picker, PickerItem, TouchableOpacity, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class PenghuniCreate extends Component {
    constructor() {
        super()
        this.state = {
            KdKos: "",
            KdKamarKos: "",
            NamaPenghuni: "",
            TGLKos: "",
            NoKTP: "",
            NoHP: "",
            NamaBank: "",
        }
    }

    render() {
        let datestring = new Date(this.state.TGLKos);
        datestring.setMinutes(datestring.getMinutes() + 420);
        let today = new Date();
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>TAMBAHPenghuni</Text>
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
                                        <H1>Data penghuni{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} style={{ marginRight: -100 }} defaultValue={this.state.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kamar Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} style={{ marginRight: -100 }} defaultValue={this.state.KdKamarKos} onChangeText={this.handleKdKamarKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama Penghuni </Text>
                                        <TextInput style={{ marginRight: -100 }} style={{ marginRight: -100 }} defaultValue={this.state.NamaPenghuni} onChangeText={this.handleNamaPenghuni}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Tanggal Kos </Text>
                                        <DatePickerIOS style={{ marginRight: -100 }} date={datestring} maximumDate={today} mode="date" onDateChange={this.handleTGLKos}></DatePickerIOS>
                                        <Text style={{ fontSize: 20 }}>No KTP </Text>
                                        <TextInput style={{ marginRight: -100 }} keyboardType='numeric' style={{ marginRight: -100 }} defaultValue={this.state.NoKTP} onChangeText={this.handleNoKTP}></TextInput>
                                        <Text style={{ fontSize: 20 }}>No HP </Text>
                                        <TextInput style={{ marginRight: -100 }} keyboardType='numeric' style={{ marginRight: -100 }} defaultValue={this.state.NoHP} onChangeText={this.handleNoHP}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama Bank </Text>
                                        <Picker style={{ marginRight: -100 }} selectedValue={this.state.NamaBank} onValueChange={this.handleNamaBank}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="BCA (Bank Central Asia)" value="BCA (Bank Central Asia)" />
                                            <Picker.Item label="BNI (Bank Negara Indonesia)" value="BNI (Bank Negara Indonesia)" />
                                            <Picker.Item label="BRI (Bank Rakyat Indonesia)" value="BRI (Bank Rakyat Indonesia)" />
                                            <Picker.Item label="Bank Mandiri" value="Bank Mandiri" />
                                        </Picker>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.createpenghuni}><Text>Simpan</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }

    createpenghuni = () => {
        if (this.state.KdKos == "" || this.state.KdKamarKos == "" || this.state.NamaPenghuni == "" ||
            this.state.TGLKos == "" || this.state.NoKTP == "" || this.state.NoHP == "" ||
            this.state.NamaBank == "") {
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
                    fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni?token=" + this.state.webtoken, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            this.setState({
                                dataPenghuni: data
                            });
                            //debugger;
                            //console.log(this.state.dataPenghuni);
                            //console.log(this.state.dataDokter[0].NamaDokter);

                        })
                        .catch((error) => {
                            //console.log(error);
                        })
                }
                else if (error) {
                    console.log('eror' + error)
                }

                return fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni?token=" + this.state.webtoken, {
                    method: 'POST',

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        KdKos: this.state.KdKos,
                        KdKamarKos: this.state.KdKamarKos,
                        NamaPenghuni: this.state.NamaPenghuni,
                        TGLKos: this.state.TGLKos,
                        NoKTP: this.state.NoKTP,
                        NoHP: this.state.NoHP,
                        NamaBank: this.state.NamaBank
                    })
                })
                    .then(response => response.json())
                    .then(
                    Alert.alert(
                        "Tambah Penghuni",
                        "Sukses",
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Penghuni') },
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
    handleNamaPenghuni = (text) => {
        this.setState({ NamaPenghuni: text })
    }
    handleTGLKos = (date) => {
        this.setState({ TGLKos: date })
    }
    handleNoKTP = (text) => {
        this.setState({ NoKTP: text })
    }
    handleNoHP = (text) => {
        this.setState({ NoHP: text })
    }
    handleNamaBank = (text) => {
        this.setState({ NamaBank: text })
    }


}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})