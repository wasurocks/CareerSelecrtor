import React from "react";
import "../../styles/QSelection.css";
import BackTab from "../../components/BackTab";
import RadioGroup from "../../components/RadioGroup";

export default props => {

    return (
        <div className="qselection">
            <BackTab />
            <div className="title">{props.text}</div>
            <RadioGroup
                className="radiogroup"
                key={props.type}
                type={props.type}
                values={props.values}
            />
        </div>
    );
}
