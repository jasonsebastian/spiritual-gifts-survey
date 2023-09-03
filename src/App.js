import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { LoadSurveyResult } from './LoadSurveyResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/spiritual-gifts-survey" exact element={<Home />} />
        <Route path="/spiritual-gifts-survey/load" element={<LoadSurveyResult />} />
      </Routes>
    </Router>
  );
}

export default App;