import React from "react";
import "../../styles/Q1.css";
import PicBox from "../../components/PicBox.js";

export default function Q1() {
    return (
        <div className="q1">
            <div className="title">Select nationality of dish</div>
            <div className="boxes">
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/thai-food.jpg"
                    text="Thai"
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/indian-food.jpg"
                    text="Indian"
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/western-food.jpg"
                    text="Western"
                />
                <PicBox
                    img="https://foodselector.sgp1.digitaloceanspaces.com/photos/japanese-food.jpg"
                    text="Japanese"
                />
            </div>
        </div>
    );
}
