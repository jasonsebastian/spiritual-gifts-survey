import React, { useState } from 'react';
import './App.css';
import { SurveyPage } from './SurveyPage';
import { ResultsPage } from './ResultsPage';
import { categories } from './categories';
import { questions } from './questions';
import { BASE_URL, MASTER_KEY } from './secrets';

const initialScores = {};
questions.forEach((q) => {
    initialScores[q.id] = 0;
});

function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

export function Home() {
    const [showResults, setShowResults] = useState(false);
    const [scores, setScores] = useState(initialScores);
    const [categoryResults, setCategoryResults] = useState([]);
    const [generateUrlInfo, setGenerateUrlInfo] = useState("");
    const [generateUrlButtonEnabled, setGenerateUrlButtonEnabled] = useState(true);

    const handleChange = (id, value) => {
        setScores({ ...scores, [id]: value });
    };

    const handleSubmit = () => {
        const results = {};

        categories.forEach((category) => {
            results[category.name] = 0;
        });

        questions.forEach((q) => {
            results[q.category] += scores[q.id];
        });

        const sortedResults = Object.entries(results).sort(([, a], [, b]) => b - a);

        setCategoryResults(sortedResults);

        setShowResults(true);
    };

    const handleBack = () => {
        setGenerateUrlInfo("");
        setGenerateUrlButtonEnabled(true);
        setShowResults(false);
    }

    const handleGenerateUrl = () => {
        const time = getCurrentTime();
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                console.log(req.responseText);
                if (req.status == 200) {
                    const resp = JSON.parse(req.responseText);
                    setGenerateUrlInfo(`URL: ${BASE_URL}/load?id=${resp.metadata.id}`);
                } else {
                    setGenerateUrlInfo(`Attempt to generate URL at ${time} was not successful.`);
                    setGenerateUrlButtonEnabled(true);
                }
            } else if (req.readyState == XMLHttpRequest.OPENED) {
                setGenerateUrlInfo("Saving...");
                setGenerateUrlButtonEnabled(false);
            }
        };

        req.open("POST", "https://api.jsonbin.io/v3/b", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", MASTER_KEY);
        req.setRequestHeader("X-Bin-Private", "false");
        req.send(JSON.stringify(scores));
    }

    return (
        <div className="App">
            {showResults ? (
                <div>
                    <ResultsPage categoryResults={categoryResults} />
                    <br />
                    <button onClick={handleGenerateUrl} disabled={!generateUrlButtonEnabled}>Generate URL</button>
                    <br />
                    {generateUrlInfo != "" && <div>{generateUrlInfo}</div>}
                    <br />
                    <button onClick={handleBack}>Back</button>
                    <br /><br />
                    <div>
                        <hr className='horizontal-line' /><br />
                        <h4 className='align-left'>Now that you have completed the survey, thoughtfully answer the following questions.</h4><br />
                        <div className='align-left'>
                            The gifts I have begun to discover in my life are:
                            <ol>
                                <li><input type="text" style={{ width: '100%' }} /></li>
                                <li><input type="text" style={{ width: '100%' }} /></li>
                                <li><input type="text" style={{ width: '100%' }} /></li>
                            </ol>
                            <ul>
                                <li>After prayer and worship, I am beginning to sense that God wants me to use my spiritual gifts
                                    to serve Christ’s body by <input type="text" />.</li>
                                <li>I am not sure yet how God wants me to use my gifts to serve others. But I am committed to prayer and worship, seeking wisdom and opportunities to use the gifts I have received from God.</li>
                            </ul>
                            Ask God to help you know how He has gifted you for service and how you can begin to use this
                            gift in ministry to others.
                            <br /><br />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <SurveyPage scores={scores} handleChange={handleChange} /><br />
                    <button onClick={handleSubmit} disabled={Object.values(scores).some(v => v == 0)}>Submit</button><br /><br />
                </div>
            )}
        </div>
    );
}