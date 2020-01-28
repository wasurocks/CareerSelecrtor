import React, { useState } from "react";

const QuestionContext = React.createContext();

const QuestionProvider = props => {
    const [question, setQuestion] = useState(1); //SET TO 1
    const [searchParams, setSearchParams] = useState({
        nationality: null,
        type: null,
        spicy: null,
        veg: null
    });
    const [submitted, setSubmitted] = useState(false);
    const [isDisplayingResults, setDispResults] = useState(false);

    // Call to clear before moving to previous question
    function clearPrevious() {
        let dict = { ...searchParams };
        switch (question) {
            case 2:
                dict["type"] = null;
                break;
            case 3:
                dict["spicy"] = null;
                dict["type"] = null;
                break;
            case 4:
                dict["veg"] = null;
                dict["spicy"] = null;
                break;
            case 5:
                dict["veg"] = null;
                break;
        }
        setSearchParams(dict);
    }

    function clearAll() {
        let dict = { ...searchParams };
        Object.keys(dict).map(key => (dict[key] = null));
        setSearchParams(dict);
    }

    function setParam(key, value) {
        let toSet = { ...searchParams };
        toSet[key] = value;
        setSearchParams(toSet);
    }

    function isQuestionAnswered() {
        switch (question) {
            case 2:
                return searchParams["type"] != null;
            case 3:
                return searchParams["spicy"] != null;
            case 4:
                return searchParams["veg"] != null;
            default:
                return false;
        }
    }

    function nextQuestion() {
        if (question < 5) setQuestion(question + 1);
    }

    function previousQuestion() {
        clearPrevious();
        if (question > 0) setQuestion(question - 1); // Prevents invalid question value
    }

    // Declare what context sends to subscribers and ensure that the provideer can be wrapped around components
    return (
        <QuestionContext.Provider
            value={{
                question,
                searchParams,
                submitted,
                setParam,
                setSubmitted,
                clearAll,
                clearPrevious,
                isDisplayingResults,
                setDispResults,
                nextQuestion,
                previousQuestion,
                isQuestionAnswered
            }}
        >
            {props.children}
        </QuestionContext.Provider>
    );
};

export { QuestionContext, QuestionProvider };
