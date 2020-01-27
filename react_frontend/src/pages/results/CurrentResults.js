import React, { useContext, useState, useEffect } from "react";
import "../../styles/CurrentResults.css";
import "../../styles/ViewAllResults.css";
import axios from "axios";
import { QuestionContext } from "../../QuestionContext";
import { AuthContext } from "../../AuthContext";
import ImgElement from "../../components/ImgElement";
import CloseButton from "../../components/CloseButton";

export default () => {
    const context = useContext(QuestionContext);
    const loginContext = useContext(AuthContext);

    const [results, setResults] = useState({});
    const [viewAllResults, setViewAllResults] = useState(false);

    // Called just once, when the component is mounted, helps to render data from the API
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
                `http://localhost:8000/api/data/${
                    viewAllResults ? "view-all" : "current-results"
                }`,
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
                        setResults(res.data);
                    } else console.log("No data found");
                }
                if (res.status == 404) {
                    console.log("Server error");
                }
            })
            // Catch errors
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            });
    }, [viewAllResults]);

    const displayItems = () => {
        let toRender = [];
        let items = { ...results };
        if (Object.entries(results).length !== 0)
            Object.keys(items).map(key => {
                let food = items[key];
                toRender.push(
                    <ImgElement
                        img={food.img_url}
                        key={food.name}
                        name={food.name}
                        desc={food.desc}
                        viewAllMode={viewAllResults}
                    />
                );
            });
        return toRender;
    };

    const viewModeTrigger = event => {
        event.preventDefault();
        setResults({});
        setViewAllResults(!viewAllResults);
    };

    const closeWindow = event => {
        event.preventDefault();
        context.setDispResults(false);
    };

    const textDisplay = () => {
        return (
            <span onClick={viewModeTrigger}>
                {viewAllResults ? "View current results" : "View all items"}
            </span>
        );
    };

    return (
        <div
            className={
                viewAllResults
                    ? "current-results view-all-results"
                    : "current-results"
            }
        >
            <div className="view-all">
                {textDisplay()}
                <CloseButton onClick={closeWindow} />
            </div>
            <div className={viewAllResults ? "items all" : "items"}>
                {displayItems()}
            </div>
            <div className="bottom-tab" />
        </div>
    );
};
