import React from "react";
import Q1 from "./Q1";
import logo from "../../logo/foodicon.png";
import "../../styles/Questions.css";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: 1,
            searchparams: {
                nationality: null,
                type: null,
                spicy: null,
                veg: null
            }
        };
        this.showQuestion = this.showQuestion.bind(this);
    }

    showQuestion(number) {
        switch (number) {
            case 1:
                return <Q1 />;
                break;
            case 2:
                return <Q1 />;
                break;
            case 3:
                return <Q1 />;
                break;
            case 4:
                return <Q1 />;
        }
    }

    render() {
        return (
            <div className="questions">
                <div className="row-1">
                    <img src={logo} className="mini-logo" />
                    <div className="log-out">Logout</div>
                </div>
                {this.showQuestion(this.state.question)}
                <div className="row-3"></div>
            </div>
        );
    }
}

export default Questions;
