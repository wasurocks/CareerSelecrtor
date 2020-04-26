import React, { useState, useContext } from "react";
import Radio from "../components/Radio";
import "../styles/RadioGroup.css";
import { QuestionContext } from "../contexts/QuestionContext";

export default props => {
    const context = useContext(QuestionContext);

    // Converts array to dictionary of truth values
    const toDict = arr => {
        let dict = {};
        arr.map(element => (dict[element] = false));
        return dict;
    };

    // Converts props.values to a dictionary of true/false
    const [values, setValues] = useState(toDict(props.values));

    const handleClick = event => {
        event.preventDefault();

        // Set dictionary truth values
        let temp = { ...values }; // Need to copy dictionary first or setValues won't trigger re-render
        for (const [key] of Object.entries(temp))
            temp[key] = key === event.target.id; // Sets the matching key to true
        setValues(temp);
        // Set parameter specified through prop to current selection
        context.setParam(props.type, event.target.id);
    };

    // Returns an array of radio elements for render
    const createChoices = info => {
        const choices = info.map(element => 
            <Radio
                value={element}
                key={element}
                onClick={handleClick}
                isChecked={values[element]}
            />
        );
        return choices;
    };

    return (
        <div
            className={
                `${props.className} group` /* variable classname + group for css */
            }
        >
            {createChoices(
                props.values
            ) /* renders the choices based on props */}
        </div>
    );
};
