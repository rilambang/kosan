import React, { Component } from "react";
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Content from "./content.js";
import Kos from "../kos/index.js";
import Penghuni from "../penghuni/index.js";
import Kamar from "../kamar/index.js"
import Penjaga from "../penjaga/index.js";
import GajiPenjaga from "../gaji/index.js";
import Side from '../side/side.js';
import Fiturkos from "../fiturkos/index.js";
export const SimpleApp = DrawerNavigator({
    Content: { screen: Content },
    Penjaga: { screen: Penjaga },
    Kos: {screen: Kos},
    Penghuni: {screen: Penghuni},
    Kamar: {screen: Kamar},
    GajiPenjaga: { screen: GajiPenjaga },
    Fiturkos:{screen:Fiturkos}
},
    {
        contentComponent: props => <Side {...props} />
    });

export default SimpleApp;