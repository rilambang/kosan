import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, AsyncStorage, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class penghuniedit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idpenghuni: this.props.navigation.state.params.idpenghuni,
            datapenghuni: "",
            KdKos: "",
            KdKamarKos:"",
            NamaPenghuni: "",
            TGLKos: "",
            NoKTP: "",
            NoHP: "",
            NamaBank: "",

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
                            datapenghuni: data,
                            KdKamarKos: data.KdKamarKos,
                            KdKos: data.KdKos,
                            NamaPenghuni: data.NamaPenghuni,
                            TGLKos: data.TGLKos,
                            NoKTP: data.NoKTP,
                            NoHP: data.NoHP,
                            NamaBank: data.NamaBank,
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
                            onPress={() => this.props.navigation.navigate("Penghunidetail", { idpenghuni: this.state.datapenghuni._id })} key={this.state.datapenghuni._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITPenghuni</Text>
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
                                        <TextInput defaultValue={this.state.datapenghuni.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kamar Kos </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.KdKamarKos} onChangeText={this.handleKdKamarKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Nama penghuni </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.NamaPenghuni} onChangeText={this.handleNamaPenghuni}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Tanggal Kos </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.TGLKos} onChangeText={this.handleTGLKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>No KTP </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.NoKTP} onChangeText={this.handleNoKTP}></TextInput>
                                        <Text style={{ fontSize: 20 }}>No Hp </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.NoHP} onChangeText={this.handleNoHP}></TextInput>
                                        <Text style={{ fontSize: 20 }}>NamaBank </Text>
                                        <TextInput defaultValue={this.state.datapenghuni.NamaBank} onChangeText={this.handleNamaBank}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editpenghuni}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    editpenghuni = () => {
        if (this.state.NamaBank == "" || this.state.KdKamarKos == "" || this.state.KdKos == "" ||
            this.state.NamaPenghuni == "" || this.state.NoKTP == "" || this.state.TGLKos == "" ||
            this.state.NoHP == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Penghuniedit', { idpenghuni: this.state.datapenghuni._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/penghuni/" + this.state.idpenghuni + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            KdKamarKos: this.state.KdKamarKos,
                            KdKos: this.state.KdKos,
                            NamaPenghuni: this.state.NamaPenghuni,
                            NoKTP: this.state.NoKTP,
                            NoHP: this.state.NoHP,
                            TGLKos: this.state.TGLKos,
                            NamaBank: this.state.NamaBank,
                        })
                    })
                        .then(response => response.json())
                        .then(
                        Alert.alert(
                            "Edit Data penghuni",
                            "Suksess",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Penghunidetail', { idpenghuni: this.state.datapenghuni._id }) },
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

    handleKdKamarKos = (text) => {
        this.setState({ KdKamarKos: text })
    }
    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }
    handleNamaPenghuni = (text) => {
        this.setState({ NamaPenghuni: text })
    }
    handleNoKTP = (text) => {
        this.setState({ NoKTP: text })
    }
    handleNoHP = (text) => {
        this.setState({ NoHP: text })
    }
    handleTGLKos = (text) => {
        this.setState({ TGLKos: text })
    }
    handleNamaBank = (text) => {
        this.setState({ NamaBank: text })
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