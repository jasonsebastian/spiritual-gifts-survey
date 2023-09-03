import React, { useEffect, useState } from "react";
import axios from "axios";
import { MASTER_KEY } from "./secrets";
import { categories } from "./categories";
import { questions } from "./questions";
import { ResultsPage } from "./ResultsPage";

export const LoadSurveyResult = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Extract the bin ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.jsonbin.io/v3/b/${id}`, {
                    headers: {
                        "X-Master-Key": MASTER_KEY
                    }
                });
                const scores = response.data.record;
                const results = {};
                categories.forEach((category) => {
                    results[category.name] = 0;
                });
                questions.forEach((q) => {
                    results[q.category] += scores[q.id] || 0;
                });

                const sortedResults = Object.entries(results).sort(([, a], [, b]) => b - a);
                setData(sortedResults);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="App">
            {loading ? (
                <div><br />Loading...</div>
            ) : (
                data && <ResultsPage categoryResults={data} fromUrl={true} />
            )}
        </div>
    );
};