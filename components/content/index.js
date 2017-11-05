import React, { Component } from "react";
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Content from "./content.js";
import Kos from "../kos/index.js";
import Penghuni from "../penghuni/index.js";
import Kamar from "../kamar/index.js"
import Penjaga from "../penjaga/index.js";
import Side from '../side/side.js';
export const SimpleApp = DrawerNavigator({
    Content: { screen: Content },
    Penjaga: { screen: Penjaga },
    Kos: {screen: Kos},
    Penghuni: {screen: Penghuni},
    Kamar: {screen: Kamar}
},
    {
        contentComponent: props => <Side {...props} />
    });

export default SimpleApp;