import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DoctorRegistration from './pages/DoctorRegistration';
import DoctorHome from './pages/DoctorHome';
import Model from './pages/Model';
import PatientRegistration from './pages/PatientRegistration';
import PatientLookup from './pages/PatientLookup';
import Visit from './pages/Visit';
import {AuthContext} from './helpers/AuthContext';
import {useState} from 'react';


function App() {

  const [authState, setAuthState] = useState(false);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/doctor/registration' exact element={<DoctorRegistration />} />
            <Route path='/doctor/home' exact element={<DoctorHome />} />
            <Route path='/doctor/model' exact element={<Model />} />
            <Route path='/patient/registration' exact element={<PatientRegistration />} />
            <Route path='/patient/lookup' exact element={<PatientLookup />} />
            <Route path='/patient/visit/:patient_email/:date_of_visit' exact element={<Visit />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
