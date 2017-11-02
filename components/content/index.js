import React, { Component } from "react";
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Content from "./content.js";
import Penjaga from "../penjaga/penjaga.js";
import Side from '../side/side.js';
export const SimpleApp = DrawerNavigator({
    Content: { screen: Content },
    Penjaga: { screen: Penjaga },
},
    {
        contentComponent: props => <Side {...props} />
    });

export default SimpleApp;