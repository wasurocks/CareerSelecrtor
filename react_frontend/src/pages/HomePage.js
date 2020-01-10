import React from "react";
import "../styles/HomePage.css"
import logo from '../logo/foodicon.png';

export default function HomePage() {
    return (
        <div id="main">
            <img src={logo} id="logo"/>
            <div id="box-text-title">
                <span>FoodBuddy</span>
            </div>
            <div id="box-text-subtitle">
                <span>Your friend in food</span>
            </div>
            <div id="box-text-subtitle2">
                <span>Successful log-in</span>
            </div>
        </div>
    );
};