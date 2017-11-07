import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, AsyncStorage, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class kamaredit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idkamar: this.props.navigation.state.params.idkamar,
            datakamar: "",
            KdKos: "",
            KdKamarKos: "",
            AC: "",
            CuciPakaian: "",
            Tagihan: "",
            BuktiTagihan: "",

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/kamar/" + this.state.idkamar + "?token=" + this.state.webtoken, {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datakamar: data,
                            KdKamarKos: data.KdKamarKos,
                            KdKos: data.KdKos,
                            AC: data.AC,
                            CuciPakaian: data.CuciPakaian,
                            Tagihan: data.Tagihan,
                            BuktiTagihan: data.BuktiTagihan,
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
                            onPress={() => this.props.navigation.navigate("Kamardetail", { idkamar: this.state.datakamar._id })} key={this.state.datakamar._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITKamar</Text>
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
                                        <TextInput defaultValue={this.state.datakamar.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Kode Kamar Kos </Text>
                                        <TextInput defaultValue={this.state.datakamar.KdKamarKos} onChangeText={this.handleKdKamarKos}></TextInput>
                                        <Text style={{ fontSize: 20 }}>AC </Text>
                                        <Picker selectedValue={this.state.datakos.AC} onValueChange={this.handleAC}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Ada" value="true" />
                                            <Picker.Item label="Tidak" value="false" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Cuci Pakaian </Text>
                                        <Picker selectedValue={this.state.datakos.CuciPakaian} onValueChange={this.handleCuciPakaian}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Ya" value="true" />
                                            <Picker.Item label="Tidak" value="false" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Tagihan </Text>
                                        <TextInput defaultValue={this.state.datakamar.Tagihan} keyboardType='numeric' onChangeText={this.handleTagihan}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Bukti Tagihan </Text>
                                        <TextInput defaultValue={this.state.datakamar.BuktiTagihan} onChangeText={this.handleBuktiTagihan}></TextInput>
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editkamar}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    editkamar = () => {
        if (this.state.KdKamarKos == "" || this.state.KdKos == "" ||
            this.state.AC == "" || this.state.Tagihan == "" || this.state.CuciPakaian == "" ||
            this.state.BuktiTagihan == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Kamaredit', { idkamar: this.state.datakamar._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/kamar/" + this.state.idkamar + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            KdKamarKos: this.state.KdKamarKos,
                            KdKos: this.state.KdKos,
                            AC: this.state.AC,
                            Tagihan: this.state.Tagihan,
                            BuktiTagihan: this.state.BuktiTagihan,
                            CuciPakaian: this.state.CuciPakaian,

                        })
                    })
                        .then(response => response.json())
                        .then(
                        Alert.alert(
                            "Edit Data kamar",
                            "Suksess",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Kamardetail', { idkamar: this.state.datakamar._id }) },
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
    handleAC = (text) => {
        this.setState({ AC: text })
    }
    handleTagihan = (text) => {
        this.setState({ Tagihan: text })
    }
    handleBuktiTagihan = (text) => {
        this.setState({ BuktiTagihan: text })
    }
    handleCuciPakaian = (text) => {
        this.setState({ CuciPakaian: text })
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