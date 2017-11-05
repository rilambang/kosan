import React, { Component } from "react";
import Penghuni from "./penghuni.js";
import Penghunidetail from "./penghunidetail.js";
import Penghunicreate from "./penghunicreate.js";
import Penghuniedit from "./penghuniedit.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Penghuni: {screen: Penghuni},
    Penghunidetail:{screen:Penghunidetail},
    Penghuniedit:{screen:Penghuniedit},
    Penghunicreate:{screen:Penghunicreate},
}, {
        navigationOptions: {
            header: false,
        }
    }));