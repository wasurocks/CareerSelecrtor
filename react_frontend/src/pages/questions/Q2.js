import React, { useContext, useState } from "react";
import "../../styles/Q2.css";
import { QuestionContext } from "../../QuestionContext";
import BackTab from "../../components/BackTab.js";

export default function Q2() {
    const context = useContext(QuestionContext);

    return (
        <div className="q2">
            <BackTab/>
            <div className="title">Select dish type</div>
        </div>
    );
}
