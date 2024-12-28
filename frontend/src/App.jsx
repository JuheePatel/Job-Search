import React, { useState } from 'react';
import './App.css';
import JobSearch from './Components/JobSearch';
import SubmitSkill from './Components/SubmitSkill';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('JobSearch');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'JobSearch':
        return <JobSearch />;
      case 'SubmitSkill':
        return <SubmitSkill />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">SCOUT</h1>
        <nav className="header-nav">
          <button
            className={activeComponent === 'JobSearch' ? 'active-tab' : ''}
            onClick={() => setActiveComponent('JobSearch')}
          >
            Job Search
          </button>
          <button
            className={activeComponent === 'SubmitSkill' ? 'active-tab' : ''}
            onClick={() => setActiveComponent('SubmitSkill')}
          >
            Get Skills
          </button>
        </nav>
      </header>
      <main>{renderComponent()}</main>
    </div>
  );
};

export default App;
