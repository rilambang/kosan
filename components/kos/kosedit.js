import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, Picker, TouchableOpacity, AsyncStorage, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class kosedit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idkos: this.props.navigation.state.params.idkos,
            datakos: "",
            KdKos: "",
            NamaKos: "",
            Lokasi: "",
            JmlKamar:"",
            KategoriKos: "",
            Pendapatan: ""
            

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
                            datakos: data,
                            KdKos: data.KdKos,
                            NamaKos: data.NamaKos,
                            KategoriKos: data.KategoriKos,
                            Lokasi: data.Location,
                            JmlKamar: data.JmlKamar,
                            Pendapatan: data.Pendapatan,
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
                            onPress={() => this.props.navigation.navigate("Kosdetail", { idkos: this.state.datakos._id })} key={this.state.datakos._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITKos</Text>
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
                                        <Picker selectedValue={this.state.datakos.KategoriKos} onValueChange={this.handleKategoriKos}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Elite" value="Kelas1" />
                                            <Picker.Item label="Menengah" value="Kelas2" />
                                            <Picker.Item label="Ekonomis" value="Kelas3" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Lokasi </Text>
                                        <TextInput defaultValue={this.state.datakos.Location} onChangeText={this.handleLocation}></TextInput>
                                        <Text style={{ fontSize: 20 }}>Jumlah Kamar </Text>
                                        <TextInput defaultValue={this.state.datakos.JmlKamar} keyboardType='numeric' onChangeText={this.handleJmlKamar}></TextInput>
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

    editkos = () => {
        if (this.state.KategoriKos == "" || this.state.KdKos == "" || this.state.NamaKos == "" || this.state.JmlKamar == "" || this.state.Location == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Kosedit', { idkos: this.state.datakos._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    console.log(this.state.webtoken)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/kos/" + this.state.idkos + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
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
                            "Edit Data kos",
                            "Suksess",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Kosdetail', { idkos: this.state.datakos._id }) },
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
    handleJmlKamar = (number) => {
        this.setState({ JmlKamar: number })
    }
    handlePendapatan = (number) => {
        this.setState({ Pendapatan: number })
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