import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { LoadSurveyResult } from './LoadSurveyResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/load" element={<LoadSurveyResult />} />
      </Routes>
    </Router>
  );
}

export default App;