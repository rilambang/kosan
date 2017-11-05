import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, AsyncStorage, Switch, Picker, StyleSheet, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup, Item,
    Tab, Tabs, Footer, FooterTab, Label, List, ListItem, H1
} from "native-base";

export default class fiturkosedit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idfiturkos: this.props.navigation.state.params.idfiturkos,
            datafiturkos: "",
            Internet: "",
            KdKos: "",
            TV: false,
            Kulkas: false,
            KamarMandi: "",
            Air: "",
            Listrik: "",

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos/" + this.state.idfiturkos + "?token=" + this.state.webtoken, {
                    method: "GET"
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datafiturkos: data,
                            Internet: data.Internet,
                            KdKos: data.KdKos,
                            KamarMandi: data.KamarMandi,
                            Air: data.Air,
                            Listrik: data.Listrik,
                            Kulkas: data.Kulkas,
                            TV: data.TV,
                        });
                        if (this.state.datafiturkos.Kulkas == false) {
                            this.setState({
                                Kulkas: "Tidak Ada"
                            });
                        } else {
                            this.setState({
                                Kulkas: "Ada"
                            });
                        }
                        if (this.state.datafiturkos.TV == false) {
                            this.setState({
                                TV: "Tidak Ada"
                            });
                        } else {
                            this.setState({
                                TV: "Ada"
                            });
                        }


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
                            onPress={() => this.props.navigation.navigate("Fiturkosdetail", { idfiturkos: this.state.datafiturkos._id })} key={this.state.datafiturkos._id}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>EDITFiturkos</Text>
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
                                        <H1 style={{ fontWeight: 'bold' }}>Data Fiturkos{"\n"}</H1>
                                        <Text style={{ fontSize: 20 }}>Kode Kos </Text>
                                        <TextInput style={{ marginRight: -100 }} defaultValue={this.state.datafiturkos.KdKos} onChangeText={this.handleKdKos}></TextInput>
                                        <Text style={{ fontSize: 10 }}>Biaya Internet saat ini : {this.state.datafiturkos.Internet} </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Internet(text)}
                                            value={this.state.Internet}
                                        />
                                        <Text style={{ fontSize: 10 }}>Biaya Air saat ini : {this.state.datafiturkos.Air} </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Air(text)}
                                            value={this.state.Air}
                                        />
                                        <Text style={{ fontSize: 10 }}>Biaya Listrik saat ini : {this.state.datafiturkos.Listrik} </Text>
                                        <TextInput
                                            style={{ marginRight: -100 }}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.Listrik(text)}
                                            value={this.state.Listrik}
                                        />
                                        <Text style={{ fontSize: 20 }}>Kamar Mandi</Text>
                                        <Picker style={{ marginRight: -100 }} selectedValue={this.state.KamarMandi} onValueChange={this.handleKamarMandi}>
                                            <Picker.Item label="Pilih" value="Pilih" disabled />
                                            <Picker.Item label="Dalam" value="Dalam" />
                                            <Picker.Item label="Luar" value="Luar" />
                                        </Picker>
                                        <Text style={{ fontSize: 20 }}>Kulkas </Text><Switch onValueChange={this.handleKulkas} value={this.state.Kulkas} />
                                        <Text style={{ fontSize: 20 }}>TV </Text><Switch onValueChange={this.handleTV} value={this.state.TV} />
                                        <Text>{"\n"}</Text>
                                        <Button primary onPress={this.editfiturkos}><Text>Update</Text></Button>
                                    </View>

                                </List>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    editfiturkos = () => {
        if (this.state.Internet == "" || this.state.KamarMandi == "" || this.state.KdKos == "" ||
            this.state.Air == "" || this.state.Listrik == "") {
            Alert.alert(
                "Peringatan!",
                "Data Tidak Boleh Kosong",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Fiturkosedit', { idfiturkos: this.state.datafiturkos._id }) },
                ]
            )
        } else {
            AsyncStorage.getItem('data', (error, result) => {
                if (result) {
                    this.setState({
                        webtoken: result
                    });
                    //console.log(this.state.webtoken)
                    if (this.state.TV == "Tidak Ada") {
                        this.setState({
                            TV: false
                        });
                    }
                    if (this.state.Kulkas == "Tidak Ada") {
                        this.setState({
                            Kulkas: false
                        });
                    }
                    console.log(this.state.TV)
                    return fetch("https://kosannarutosasuke.herokuapp.com/api/fiturkos/" + this.state.idfiturkos + "?token=" + this.state.webtoken, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Internet: this.state.Internet,
                            KdKos: this.state.KdKos,
                            KamarMandi: this.state.KamarMandi,
                            TV: this.state.TV,
                            Kulkas: this.state.Kulkas,
                            Listrik: this.state.Listrik,
                            Air: this.state.Air,
                        })
                    })
                        .then(response => response.json())
                        .then(
                        Alert.alert(
                            "Edit Data Fiturkos",
                            "Sukses",
                            [
                                { text: "OK", onPress: () => this.props.navigation.navigate('Fiturkosdetail', { idfiturkos: this.state.datafiturkos._id }) },
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

    Internet(text) {
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
            this.setState({ Internet: newText });
        }
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
                alert("Isi Dengan Nomor");
            }
            this.setState({ Listrik: newText });
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
                alert("Isi Dengan Nomor");
            }
            this.setState({ Air: newText });
        }
    }
    handleKdKos = (text) => {
        this.setState({ KdKos: text })
    }
    handleAir = (text) => {
        this.setState({ Air: text })
    }
    handleKulkas = (text) => {
        this.setState({ Kulkas: text })
    }
    handleKamarMandi = (text) => {
        this.setState({ KamarMandi: text })
    }
    handleListrik = (text) => {
        this.setState({ Listrik: text })
    }
    handleTV = (text) => {
        this.setState({ TV: text })
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