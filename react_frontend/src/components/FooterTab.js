import React, { useContext, useState } from "react";
import "../styles/FooterTab.css";
import { QuestionContext } from "../QuestionContext";

export default props => {
    const context = useContext(QuestionContext);

    const [isDisplayingResults, setDispResults] = useState(false);
    const [isGoingNext, setNext] = useState(false);

    function disp_results(event) {
        event.preventDefault();
        // Display results function
    }

    function next(event) {
        event.preventDefault();
        setNext(true);
    }

    if (isGoingNext) {
        setNext(false);
        context.nextQuestion();
    }
    return (
        <div className="footertab">
            <div
                className="disp-results"
                onClick={disp_results}
                style={{ visibility: props.showButtons ? "visible" : "hidden" }}
            >
                Display Results...
            </div>
            <div
                className="next"
                onClick={next}
                style={{ visibility: props.showButtons ? "visible" : "hidden" }}
            >
                Next
            </div>
        </div>
    );
};
