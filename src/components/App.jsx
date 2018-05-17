import React from 'react';
import Form from './Form'
import logo from '../assets/images/logo.png';
import '../assets/styles/App.css';

const App = () => {
  return (
    <div className="App">
      <header className="navigation">
        <a href="https://www.dosomething.org/us">
        <img src={logo} className="navigation__logo" alt="DoSomething.org" />
        </a>
        <ul className="navigation__primary">
          <li><a href="https://www.dosomething.org/us/campaigns">
            <strong className="navigation__title">Explore Campaigns</strong>
            <span className="navigation__subtitle">Find ways to take action both online and off.</span></a>
          </li>
          <li><a href="https://www.dosomething.org/about/who-we-are-0">
            <strong className="navigation__title">What Is DoSomething.org?</strong>
            <span className="navigation__subtitle">A global movement for good.</span></a>
          </li>
        </ul>
      </header>
      <Form/>
    </div>
  );
}

export default App;
