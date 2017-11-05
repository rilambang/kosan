import React, { Component } from "react";
import Kamar from "./kamar.js";
import Kamardetail from "./kamardetail.js";
import Kamarcreate from "./kamarcreate.js";
import Kamaredit from "./kamaredit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Kamar: {screen: Kamar},
    Kamardetail:{screen:Kamardetail},
    Kamaredit:{screen:Kamaredit},
    Kamarcreate:{screen:Kamarcreate},
}, {
        navigationOptions: {
            header: false,
        }
    }));