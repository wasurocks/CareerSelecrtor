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

    // Call to clear before moving to previous question
    function clearPrevious() {
        let dict = {...searchParams};
        switch(question) {
            case 2:
                dict["type"] = null;
            case 3:
                dict["spicy"] = null;
            case 4:
                dict["veg"] = null;
        }
        setSearchParams(dict);
    }

    function setParam(key, value) {
        let toSet = {...searchParams};
        toSet[key] = value;
        setSearchParams(toSet);
    }

    function nextQuestion() {
        if (question < 5) setQuestion(question + 1);
    }

    function previousQuestion() {
        clearPrevious();
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
