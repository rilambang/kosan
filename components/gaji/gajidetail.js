import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, AsyncStorage, AppRegistry, StatusBar, Alert, TextInput } from 'react-native';
import {
    Button, Separator, Form, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Input, InputGroup,
    Item, Tab, Tabs, Footer, FooterTab, Label, List, ListItem
} from "native-base";

export default class Gajidetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datagaji: "",
            idgaji: this.props.navigation.state.params.idgaji
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                fetch("https://kosannarutosasuke.herokuapp.com/api/GajiPenjaga/" + this.state.idgaji + "?token=" + this.state.webtoken, {
                    method: "GET"
                })

                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            datagaji: data
                        });
                        console.log(this.state.datagaji);

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
                            onPress={() => this.props.navigation.navigate("Gaji")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold' }}>DETAILGaji</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Separator bordered>
                        <Text style={styles.text}>Kategori Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datagaji.KategoriKos}</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text style={styles.text}>Kode Kos</Text>
                    </Separator>
                    <ListItem >
                        <Text>{this.state.datagaji.Gaji}</Text>
                    </ListItem>
                    <Card>
                        <CardItem>
                            <Left>
                                <Button rounded info onPress={() => this.props.navigation.navigate("Gajiedit", { idgaji: this.state.datagaji._id })} key={this.state.datagaji._id}>
                                    <Icon name="color-filter" />
                                    <Text>Edit</Text>
                                </Button>
                            </Left>
                            <Right>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    Deletegaji = () => {
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    webtoken: result
                });
                console.log(this.state.webtoken)
                Alert.alert(
                    'Hapus Gaji Penjaga',
                    'Anda yakin ingin menghapus gaji penjaga ini?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                return fetch("https://kosannarutosasuke.herokuapp.com/api/GajiPenjaga/" + this.state.datagaji._id + "?token=" + this.state.webtoken, {
                                    method: "DELETE"
                                })
                                    .then((response) => response.json())
                                    .then(
                                    Alert.alert(
                                        'Hapus Data Gaji Penjaga',
                                        'Data Berhasil Terhapus',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Gaji') },
                                        ]
                                    )
                                    )
                            }
                        }
                    ]
                )

            }
            else if (error) {
                console.log('eror' + error)
            }
        })
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
