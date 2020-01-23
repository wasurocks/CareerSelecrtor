import React from "react";
import "../styles/RadioGroup.css"

export default props => {
    return(
        <div className={`radiobtn ${props.isChecked?"selected":"normal"}`} onClick={props.onClick} id={props.value}>
            {props.value}
        </div>
    );
}