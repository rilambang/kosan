import React, { Component } from "react";
import Kos from "./kos.js";
import Kosdetail from "./kosdetail.js";
import Koscreate from "./koscreate.js";
import Kosedit from "./kosedit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Kos: {screen: Kos},
    Kosdetail:{screen:Kosdetail},
    Kosedit:{screen:Kosedit},
    Koscreate:{screen:Koscreate},
}, {
        navigationOptions: {
            header: false,
        }
    }));