import React, { useState } from 'react';
import './App.css';
import JobSearch from './Components/JobSearch';
import SubmitSkill from './Components/SubmitSkill';
import CompareCareers from './Components/CompareCareers';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('JobSearch');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'JobSearch':
        return <JobSearch />;
      case 'SubmitSkill':
        return <SubmitSkill />;
      case 'CompareCareers':
        return <CompareCareers />;
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
            Submit Skill
          </button>
          <button
            className={activeComponent === 'CompareCareers' ? 'active-tab' : ''}
            onClick={() => setActiveComponent('CompareCareers')}
          >
            Compare Careers
          </button>
        </nav>
      </header>
      <main>{renderComponent()}</main>
    </div>
  );
};

export default App;
