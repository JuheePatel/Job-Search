import React from 'react';
import './App.css';
import JobSearch from './Components/JobSearch';

const App = () => {

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Job Search</h1>
      </header>
      <JobSearch />
    </div>
  );
};

export default App;
