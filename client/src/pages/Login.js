import React from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';
import * as Yup from "yup";
import "../App.css";

function Login() {

  const initialValues = {
    doctor_email: "",
    passcode: ""
  }

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    doctor_email: Yup.string().required("You must input an email!"),
    passcode: Yup.string().required("You must input a passcode!")
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/login", data).then((response) => {
      if(response.data.error) {
        console.log(response.data.error);
        alert(response.data.error);
      } else {
        console.log(response.data);
        sessionStorage.setItem("accessToken", response.data);
        alert("Logged In!");
        navigate("/doctor/home");
      }
    });
  }

  return (
    <div className="loginPage">
      <DefaultNavbar />
      <div className='body'>
        <h1>Doctor Login Page</h1>
        <div className='form'>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <label className="doctor_email">Email: </label>
              <ErrorMessage name="doctor_email" component="span"/>
              <Field autoComplete="off" id="doctor_email" name="doctor_email" placeholder="(Ex: jsmith@gmail.com)"/>
              
              <label className="passcode">Passcode: </label>
              <ErrorMessage name="passcode" component="span"/>
              <Field autoComplete="off" id="passcode" name="passcode" placeholder="(Ex: jsmith123)"/>

              <br />

              <button className="loginButton" type="submit">Login</button>
              <br />
              <a className="redirect" href="/doctor/registration">New User? Register Now</a>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login