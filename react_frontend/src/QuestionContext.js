import React, { useState } from "react";

const QuestionContext = React.createContext();

const QuestionProvider = props => {
    const [question, setQuestion] = useState(1);//SET TO 1
    const [searchParams, setSearchParams] = useState({
        nationality: null,
        type: null,
        spicy: null,
        veg: null
    });
    const [submitted, setSubmitted] = useState(false);

    function setParam(key, value) {
        alert(value);
        let toSet = {...searchParams};
        toSet[key] = value;
        setSearchParams(toSet);
    }

    function nextQuestion() {
        setQuestion(question + 1);
    }

    function previousQuestion() {
        if (question > 0) setQuestion(question - 1); // Prevents invalid question value
    }

    return (
        <QuestionContext.Provider
            value={{
                question,
                searchParams,
                submitted,
                setParam,
                setSubmitted,
                nextQuestion,
                previousQuestion
            }}
        >
            {props.children}
        </QuestionContext.Provider>
    );
};

export { QuestionContext, QuestionProvider };
