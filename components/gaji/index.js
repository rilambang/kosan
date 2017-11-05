import React, { Component } from "react";
import Gaji from "./gaji.js";
import Gajidetail from "./gajidetail.js";
import Gajiedit from "./gajiedit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Gaji: {screen: Gaji},
    Gajidetail:{screen:Gajidetail},
    Gajiedit:{screen:Gajiedit},
}, {
        navigationOptions: {
            header: false,
        }
    }));