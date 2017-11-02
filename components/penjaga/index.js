import React, { Component } from "react";
import Penjaga from "./penjaga.js";
import Penjagadetail from "./penjagadetail.js";
import Penjagacreate from "./penjagacreate.js";
import Penjagaedit from "./penjagaedit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Penjaga: {screen: Penjaga},
    Penjagadetail:{screen:Penjagadetail},
    Penjagaedit:{screen:Penjagaedit},
    Penjagacreate:{screen:Penjagacreate},
}, {
        navigationOptions: {
            header: false,
        }
    }));