import React from 'react';

export function ResultsPage({ categoryResults }) {
    return (
        <div>
            <h2>Results</h2>
            {categoryResults.map(([category, score], index) => (
                <div key={index}>
                    {category}: {score}
                </div>
            ))}
        </div>
    );
}