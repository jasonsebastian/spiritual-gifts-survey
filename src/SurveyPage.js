import React from 'react';
import { questions } from './questions';

export function SurveyPage({ scores, handleChange }) {
    return <div>
        <h1>Spiritual Gifts Survey</h1>
        <h2>Directions</h2>
        <div className="align-left">
            This is not a test, so there are no wrong answers. The Spiritual Gifts Survey consists of 80 statements. Some items reflect concrete actions, other items are descriptive traits, and still others are statements of belief.<br />
            <ul>
                <li>Select the one response you feel best characterizes yourself and place that number in the blank
                    provided. Record your answer in the blank beside each item.</li>
                <li>Do not spend too much time on any one item. Remember, it is not a test. Usually your immediate response is best.</li>
                <li>Please give an answer for each item. Do not skip any items.</li>
                <li>Do not ask others how they are answering or how they think you should answer.</li>
                <li>Work at your own pace.</li>
            </ul><br />
            Your response choices are:
            <div className="response-list">
                5—Highly characteristic of me/definitely true for me<br />
                4—Most of the time this would describe me/be true for me<br />
                3—Frequently characteristic of me/true for me–about 50 percent of the time<br />
                2—Occasionally characteristic of me/true for me–about 25 percent of the time<br />
                1—Not at all characteristic of me/definitely untrue for me<br />
            </div>
        </div>
        <br /><hr className="horizontal-line" /><br />
        <form>
            <div className="align-left">
                {questions.map((q) => (
                    <div key={q.id}>
                        <select
                            onChange={(e) => handleChange(q.id, parseInt(e.target.value, 10))}
                            value={scores[q.id]}
                        >
                            <option value={0}>Select</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <label className="question-text">{q.text}</label>
                    </div>
                ))}
            </div>
        </form>
    </div>;
}