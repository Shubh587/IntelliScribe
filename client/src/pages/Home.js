import React from 'react'
import DefaultNavbar from '../components/DefaultNavbar';
import "../App.css";

function Home() {
  return (
    <div className='welcomePage'>
      <div className='welcomePageHeader'>
        <DefaultNavbar />
      </div>
      <div className='welcomePageBody'>
        <h1 className='welcomeStatementContainer'>Welcome!</h1>
        <h2 className='projectNameContainer'>IntelliScribe</h2>
        <br />
        <div className='projectDescriptionContainer'>
          <p>This web application is built for physicians in both clinic and hospital settings to automate EHR/EMR Creation for their patients.</p>
          <p>This application addresses the issue of physicians spending too much time on administrative tasks and data entry and not on face-to-face time with their patients.</p>
          <p>This tool uses Amazon Web Service's Comprehend Medical Model to extract important medical data from physician's conversations with their patients in real-time</p>
          <p></p>
        </div>
        <div className='contributorsContainer'>
          <p>Contributors: Shubh Savani</p>
          <p>Advisors: Professor Ingrid Paredes, Professor Richard Toth</p>
        </div>
        </div>
    </div>
  );
}

export default Home