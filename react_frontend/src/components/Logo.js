import React from "react";
import logo from "../logo/foodicon.png";
import "../styles/Logo.css";

export default function Logo() {
    return (
        <div className="logo">
            <img src={logo} className="logo" />
            <div className="title">
                <span className="text">FoodBuddy</span>
            </div>
            <div className="subtitle">
                <span className="text">Your friend in food</span>
            </div>
        </div>
    );
}
