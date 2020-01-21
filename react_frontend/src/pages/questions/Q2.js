import React, { useContext, useState } from "react";
import "../../styles/Q2.css";
import { QuestionContext } from "../../QuestionContext";
import BackTab from "../../components/BackTab.js";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

export default function Q2() {
    const context = useContext(QuestionContext);

    return (
        <div className="q2">
            <BackTab/>
            <div className="title">Select dish type</div>
                <Button
                className="soup"/>
                <Button
                className="main"/>
                <Button
                className="salad"/>
                <Button
                className="dessert"/>
        </div>
    );
}
