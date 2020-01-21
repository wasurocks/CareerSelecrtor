import React from "react";
import "../styles/PicBox.css";

export default (props) => (
    <div className="picBox" onClick={props.onClick}>
        <img className="picImg" src={props.img} />
        <div className="picText">{props.text}</div>
    </div>
);
