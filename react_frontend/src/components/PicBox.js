import React from "react";
import "../styles/PicBox.css";

export default (props) => (
    <div className="picBox" onClick={props.onClick} id={props.value}>
        <img className="picImg" alt={props.value} src={props.img}/>
        <div className="picText">{props.value}</div>
    </div>
);
