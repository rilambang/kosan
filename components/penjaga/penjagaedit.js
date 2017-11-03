import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, AsyncStorage, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class penjagaedit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idpenjaga: this.props.navigation.state.params.idpenjaga,
            datapenjaga: "",
            KdPenjaga: "",
            KdKos: "",
            NamaPenjaga: "",
            Alamat: "",
            NoHp: "",
            JenisKelamin: "",
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
                fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga/" + this.state.idpenjaga + "?token=" + this.state.webtoken, {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datapenjaga: data,
                            KdPenjaga: data.KdPenjaga,
                            KdKos: data.KdKos,
                            NamaPenjaga: data.NamaPenjaga,
                            KategoriKos: data.KategoriKos,
                            NoHp: data.NoHp,
                            Alamat: data.Alamat,
                            JenisKelamin: data.JenisKelamin,
                        });

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
                            onPress={() => this.props.navigation.navigate("Penjagadetail", { idpenjaga: this.state.datapenjaga._id })} key={this.state.datapenjaga._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITPenjaga</Text>
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
                                        <TextInput defaultValue={this.state.datapenjaga.KdPenjaga} onChangeText={this.handleKdPenjaga}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama penjaga </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.NamaPenjaga} onChangeText={this.handleNamaPenjaga}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Jenis Kelamin </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.JenisKelamin} onChangeText={this.handleJenisKelamin}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Alamat </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.Alamat} onChangeText={this.handleAlamat}></TextInput>
                                        <Text style={{ fontSize: 20 }}>No Hp </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.NoHp} onChangeText={this.handleNoHp}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kategori Kos </Text>
                                        <TextInput defaultValue={this.state.datapenjaga.KategoriKos} onChangeText={this.handleKategoriKos}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editpenjaga}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    editpenjaga = () => {
        if (this.state.KategoriKos == "" || this.state.KdPenjaga == "" || this.state.KdKos == "" ||
            this.state.NamaPenjaga == "" || this.state.Alamat == "" || this.state.JenisKelamin == "" ||
            this.state.NoHp == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Penjagaedit', { idpenjaga: this.state.datapenjaga._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/penjaga/" + this.state.idpenjaga + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            KdPenjaga: this.state.KdPenjaga,
                            KdKos: this.state.KdKos,
                            NamaPenjaga: this.state.NamaPenjaga,
                            Alamat: this.state.Alamat,
                            NoHp: this.state.NoHp,
                            JenisKelamin: this.state.JenisKelamin,
                            KategoriKos: this.state.KategoriKos,
                        })
                    })
                        .then(response => response.json())
                        .then(
                        Alert.alert(
                            "Edit Data penjaga",
                            "Suksess",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Penjagadetail', { idpenjaga: this.state.datapenjaga._id }) },
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
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})