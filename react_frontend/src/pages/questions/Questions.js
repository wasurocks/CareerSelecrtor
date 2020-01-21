import React, { useContext } from "react";
import Q1 from "./Q1";
import Q2 from "./Q2";
import "../../styles/Questions.css";
import HeaderTab from "../../components/HeaderTab";
import { QuestionContext } from "../../QuestionContext";

export default function Questions() {
    const context = useContext(QuestionContext);

    function displayQuestion(number) {
        switch (number) {
            case 1:
                return <Q1 />;
            case 2:
                return <Q2 />;
            case 3:
                return <Q2 />;
            case 4:
                return <Q2 />;
        }
    }

    if (context.question == 4) return <div>RESULTS</div>;
    return (
        <div className="questions">
            <HeaderTab />
            {displayQuestion(context.question)}
            <div className="row-3"/>
        </div>
    );
}
