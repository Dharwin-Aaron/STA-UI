import React from 'react';
import './css/styles.css'; // Adjust the path as needed

const Portfolio = () => {
  return (
    <div>
      <div className="header">
        <img src="images/portfolio.png" alt="My Icon" width="50" height="50" />
        <ul>
          <li>About</li>
          <li>Skills</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="main-content mr-50">
        <div className="intro">
          <div className="line"></div>
          <div className="text-block">
            <br />
            Hello, I'm Dharwin,
            <br />
            a Full Stack Developer
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
