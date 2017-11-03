import React from "react";
import { AppRegistry, Image,Alert, StatusBar, AsyncStorage } from "react-native";
import { Container, Content, Text, List, ListItem, Button } from "native-base";
const routes = ["Content", "Penjaga", "Kos"];
export default class Side extends React.Component {
    constructor() {
        super()
        this.state = {
            Logout: "",
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Image source={require("../../assets/images/hp-png.png")}>
                        {/*<Image style={{width:30, height:30 }} source={require("../../assets/images/bulan-png.png")}></Image>*/}
                        {/*<Text style={{textAlign: "center", marginTop:70, fontSize:30, color: "#fff" }}>Batch 124</Text>*/}
                    </Image>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />
                    <ListItem
                        button
                        primary onPress={this.Logout}>
                        <Text>Logout</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }

    Logout = () => {
        AsyncStorage.removeItem('data', (error, result) => {
            Alert.alert(

                "Logout",
                "Sukses",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Login') },
                ]
            )

        })
    }
}
