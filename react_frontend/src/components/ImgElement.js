import React from "react";
import "../styles/ImgElement.css";

export default props => {
    return (
        <div className="img-element">
            <img src={props.img} />
            <div className="info">
                <div className="name">{props.name}</div>
                <div className="desc">{props.desc}</div>
            </div>
        </div>
    );
};
