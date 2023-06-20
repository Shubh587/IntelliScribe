import React, {useState} from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';

function DoctorNavbar() {

  const [showButtons, setShowButtons] = useState(false);

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate('/');
    alert("Logged Out!");
  }

  return (
    <div className='DoctorNavbar'>
        <div className='leftSide'>
          <div className='doctorHomeBtnContainer' id={showButtons ? "hidden" : ""}>
            <a href="/doctor/home">
              <button className='doctorHomeBtn'>Home</button>
            </a>
          </div>
          <div className='openBtnContainer'>
                <button className='openBtn' onClick={() => setShowButtons(!showButtons)}> Open </button>
            </div>
        </div>
        <div className='middle'>
          <div className='patientRegistrationBtnContainer' id={showButtons ? "hidden" : ""}>
            <a href='/patient/registration'>
              <button className='patientRegistrationBtn'>Register Patient</button>
            </a>
          </div>
        </div>
        <div className="rightSide">
          <div className='logoutBtnContainer' id={showButtons ? "hidden" : ""}>
            <button className='logoutBtn' onClick={logout}>Logout</button>
          </div>
        </div>
    </div>
  )
}

export default DoctorNavbar