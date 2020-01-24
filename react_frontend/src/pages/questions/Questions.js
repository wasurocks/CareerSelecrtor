import React, { useContext } from "react";
import Q1 from "./Q1";
import QSelection from "./QSelection";
import "../../styles/Questions.css";
import HeaderTab from "../../components/HeaderTab";
import { QuestionContext } from "../../QuestionContext";
import FooterTab from "../../components/FooterTab";

export default function Questions() {
    const context = useContext(QuestionContext);

    function displayDictionary(dict) {
        let temp = { ...dict };
        let toRender = [];
        Object.keys(temp).forEach(key => toRender.push(<div>{temp[key]}</div>));
        return toRender;
    }

    function displayQuestion(number) {
        switch (number) {
            case 1:
                return <Q1 />;
            case 2:
                return (
                    <QSelection
                        text="Select dish type"
                        type="type"
                        values={["soup", "main", "salad", "dessert"]}
                    />
                );
            case 3:
                return (
                    <QSelection
                        text="Want it spicy?"
                        type="spicy"
                        values={["yes", "no"]}
                    />
                );
            case 4:
                return (
                    <QSelection
                        text="Are you vegetarian?"
                        type="veg"
                        values={["yes", "no"]}
                    />
                );
        }
    }

    if (context.question > 4) return <div>RESULTS</div>;
    return (
        <div className="questions">
            <HeaderTab />
            {displayQuestion(context.question)}
            <FooterTab showButtons={context.question != 1} />
        </div>
    );
}
