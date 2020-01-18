import React from "react";
import "../styles/PicBox.css";

const PicBox = props => {
    return (
        <div className="picBox">
            <img className="picImg" src={props.img} />
            <div className="picText">{props.text}</div>
        </div>
    );
};

export default PicBox;
