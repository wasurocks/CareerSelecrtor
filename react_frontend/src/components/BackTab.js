import React, { useState, useContext } from "react";
import "../styles/BackTab.css";
import { QuestionContext } from "../contexts/QuestionContext";

export default function BackTab() {
    const context = useContext(QuestionContext);
    const [isGoingBack, setBack] = useState(false);

    function back(event) {
        event.preventDefault();
        setBack(true);
    }

    if (isGoingBack) {
        setBack(false);
        context.clearPrevious();
        context.previousQuestion();
    }
    return (
        <div className="backtab">
            <div className="back" onClick={back}>
                Back
            </div>
        </div>
    );
}
