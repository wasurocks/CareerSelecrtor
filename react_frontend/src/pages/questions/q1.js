import React, { useContext } from "react";
import "../../styles/Q1.css";
import PicBox from "../../components/PicBox.js";
import { QuestionContext } from "../../contexts/QuestionContext";

export default function Q1() {
    const context = useContext(QuestionContext);

    function handleClick(event) {
        event.preventDefault();
        context.setParam("nationality", event.currentTarget.id);
        context.nextQuestion();
    }

    return (
        <div className="q1">
            <div className="title">Select nationality of dish</div>
            <div className="boxes">
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/thai-food.jpg"
                    value="thai"
                    onClick={handleClick}
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/indian-food.jpg"
                    value="indian"
                    onClick={handleClick}
                    
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/western-food.jpg"
                    value="western"
                    onClick={handleClick}
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/japanese-food.jpg"
                    value="japanese"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}
