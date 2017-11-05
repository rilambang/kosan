import React, { Component } from "react";
import Fiturkos from "./fiturkos.js";
import Fiturkosdetail from "./fiturkosdetail.js";
import Fiturkoscreate from "./fiturkoscreate.js";
import Fiturkosedit from "./fiturkosedit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Fiturkos: {screen: Fiturkos},
    Fiturkosdetail:{screen:Fiturkosdetail},
    Fiturkosedit:{screen:Fiturkosedit},
    Fiturkoscreate:{screen:Fiturkoscreate},
}, {
        navigationOptions: {
            header: false,
        }
    }));