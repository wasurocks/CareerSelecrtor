import React, { useState, useContext } from "react";
import "../../styles/Q1.css";
import PicBox from "../../components/PicBox.js";
import { QuestionContext } from "../../QuestionContext";

export default function Q1() {
    const context = useContext(QuestionContext);

    function onClick(event, value) {
        event.preventDefault();
        context.setParam("nationality", value);
        context.nextQuestion();
    }

    return (
        <div className="q1">
            <div className="title">Select nationality of dish</div>
            <div className="boxes">
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/thai-food.jpg"
                    text="Thai"
                    onClick={(e) => onClick(e, "thai")}
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/indian-food.jpg"
                    text="Indian"
                    onClick={(e) => onClick(e, "indian")}
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/western-food.jpg"
                    text="Western"
                    onClick={(e) => onClick(e, "western")}
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/japanese-food.jpg"
                    text="Japanese"
                    onClick={(e) => onClick(e, "japanese")}
                />
            </div>
        </div>
    );
}
