import React, { useContext, useState } from "react";
import "../styles/FooterTab.css";
import { QuestionContext } from "../contexts/QuestionContext";

export default props => {
    const context = useContext(QuestionContext);

    const [isGoingNext, setNext] = useState(false);

    function disp_results(event) {
        event.preventDefault();
        context.setDispResults(true);
    }

    function next(event) {
        event.preventDefault();
        if(context.isQuestionAnswered()) setNext(true);
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
                className={`next ${context.isQuestionAnswered()?"enabled":"disabled"}`}
                onClick={next}
                style={{ visibility: props.showButtons ? "visible" : "hidden"  }}
            >
                Next
            </div>
        </div>
    );
};
