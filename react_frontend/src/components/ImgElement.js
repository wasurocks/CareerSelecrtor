import React from "react";
import "../styles/ImgElement.css";

export default props => {
    return (
        <div className={`img-element ${props.viewAllMode?"item-view-all":""}`}>
            <img src={props.img} alt={props.name}/>
            <div className="info">
                <div className="name">{props.name}</div>
                <div className="desc">{props.desc}</div>
            </div>
        </div>
    );
};
