import React from 'react'
import DoctorNavbar from '../components/DoctorNavbar'
import "../App.css";

function DoctorHome() {
  return (
    <div className="DoctorHome">
        <DoctorNavbar />
        <br />
        <div className='container'>
            <div className="NewVisitContainer">
                <a href="/doctor/model">
                    <button className='NewVisitBtn'>New Visit</button>
                </a>
            </div>
            <br />
            <div className="PatientLookupContainer">
                <a href="/patient/lookup">
                    <button className='PatientLookupBtn'>Lookup Patient EHR</button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default DoctorHome