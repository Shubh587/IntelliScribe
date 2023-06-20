import React, {useState} from 'react'
import "../App.css";

function DefaultNavbar() {

    const [showButtons, setShowButtons] = useState(false);

  return (
    <div className='DefaultNavbar'>
        <div className='leftSide'> 
            <div className='homeBtnContainer' id={showButtons ? "hidden" : ""}>
                <a href="/">
                    <button className="homeBtn">Home</button>
                </a>
            </div>
            <div className='openBtnContainer'>
                <button className='openBtn' onClick={() => setShowButtons(!showButtons)}> Open </button>
            </div>
        </div>
        <div className='middle'>
            <div className='doctorRegisterBtnContainer' id={showButtons ? "hidden" : ""}>
                <a href='/doctor/registration'>
                    <button className="doctorRegisterBtn">Register</button>
                </a>
            </div>
        </div>
        <div className="rightSide">
            <div className='loginBtnContainer' id={showButtons ? "hidden" : ""}>
                <a href='/login'>
                    <button className="loginBtn">Login</button>
                </a>
            </div>
        </div>
    </div>
  )
}

export default DefaultNavbar