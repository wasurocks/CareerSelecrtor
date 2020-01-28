import React, { useContext, useState, useEffect } from "react";
import "../../styles/FinalResults.css";
import axios from "axios";
import { QuestionContext } from "../../QuestionContext";
import { AuthContext } from "../../AuthContext";
import ImgElement from "../../components/ImgElement";
import BackTab from "../../components/BackTab";

export default () => {
    const context = useContext(QuestionContext);
    const loginContext = useContext(AuthContext);

    const [results, setResults] = useState({});

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
                "http://localhost:8000/api/data/current-results",
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
    }, []);

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
                        viewAllMode={true}
                    />
                );
            });
        return toRender;
    };

    return (
        <div className="final-results">
            <BackTab />
            <div className="title">Results</div>
            <div className="items">{displayItems()}</div>
        </div>
    );
};
