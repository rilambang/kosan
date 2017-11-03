import React, { Component } from "react";
import Login from "./Login.js";
import Home from "../content/index.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Login: {screen: Login},
    Home:{screen:Home},
}, {
        navigationOptions: {
            header: false,
        }
    }));