import React, { useContext, useState, useEffect } from "react";
import "../../styles/CurrentResults.css";
import axios from "axios";
import { QuestionContext } from "../../QuestionContext";
import { AuthContext } from "../../AuthContext";
import ImgElement from "../../components/ImgElement";

export default () => {
    const context = useContext(QuestionContext);
    const loginContext = useContext(AuthContext);

    const [results, setResults] = useState({});

    useEffect(() => {
        // Declare content type
        const config = {
            headers: {
                Authorization: loginContext.getUserToken(),
                "Content-Type": "application/json"
            }
        };
        axios
            .post(
                `http://localhost:8000/api/data`,
                {
                    searchparams: context.searchParams
                },
                config
            )
            // In case of successful login
            .then(res => {
                if (res.status == 200) {
                    if (Object.entries(res.data).length !== 0) {
                        console.log("Data found:");
                        console.log(res.data);
                        setResults(res.data);
                    } else {
                        console.log("No data found");
                    }
                }
                if (res.status == 404) {
                    console.log("Database not initiated");
                }
            })
            // Catch errors
            .catch(err => {
                if (err) {
                    console.log("Error");
                    console.log(err);
                }
            });
    }, []);

    const displayItems = () => {
        let toRender = [];
        let items = { ...results };
        Object.keys(items).map(key => {
            let food = items[key];
            toRender.push(
                <ImgElement
                    img={food.img_url}
                    key={food.name}
                    name={food.name}
                    desc={food.desc}
                />
            );
        });
        return toRender;
    };

    const closeWindow = event => {
        event.preventDefault();
        context.setDispResults(false);
    };

    return (
        <div className="current-results">
            <div className="view-all">
                <span>View all items</span>
                <svg
                    onClick={closeWindow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 28.905 28.905"
                >
                    <g
                        id="Component_1_1"
                        data-name="Component 1 – 1"
                        transform="translate(1.414 1.414)"
                    >
                        <line
                            id="Line_66"
                            data-name="Line 66"
                            x2="26.076"
                            y2="26.076"
                            fill="none"
                            stroke="#707070"
                            strokeWidth="4"
                        />
                        <line
                            id="Line_67"
                            data-name="Line 67"
                            x2="26.076"
                            y2="26.076"
                            transform="translate(26.076) rotate(90)"
                            fill="none"
                            stroke="#707070"
                            strokeWidth="4"
                        />
                    </g>
                </svg>
            </div>
            <div className="items">{displayItems()}</div>
        </div>
    );
};
