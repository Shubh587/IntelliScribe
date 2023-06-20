import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';
import "../App.css";

function DoctorRegistration() {

    let navigate = useNavigate();

    const initialValues = {
        doctor_email: "",
        first_name: "",
        last_name: "",
        passcode: "",
        phone_number: "",
        office_streetname: "",
        office_city: "",
        office_state: "",
        office_zipcode: ""
    };

    const validationSchema = Yup.object().shape({
        doctor_email: Yup.string().email().required("Must enter an email!"),
        first_name: Yup.string().required("Must enter your first name!"),
        last_name: Yup.string().required("Must enter your last name!"),
        passcode: Yup.string().required("Must enter a password!").min(5).max(50),
        phone_number: Yup.string().required("Must enter a phone number").min(10).max(12),
        office_streetname: Yup.string().required("Must enter your office's streetname"),
        office_city: Yup.string().required("Must enter the city where your office is located"),
        office_state: Yup.string().required("Must enter the state where your office is located"),
        office_zipcode: Yup.string().required("Must enter the zipcode where your office is located")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register", data).then((response) => {
            if(response.data.error) {
                console.log("Failed to create Doctor Profile");
                console.log(response.data.error);
                alert(response.data.error);
            } else {
                console.log(data);
                console.log("Successfully created Doctor Profile");
                alert("Successfully created Doctor Profile");
                navigate("/login");
            }
        });
    };

  return (
    <div className="DoctorRegistrationPage">
        <div className='head'>
            <DefaultNavbar />
        </div>
        <div className='body'>
            <div className='title'>
                <h1>Register Your Information:</h1>
            </div>
            <br />
            <div className='form'>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='body'>
                        <label>Email: </label>
                        <ErrorMessage name="doctor_email" component="span"/>
                        <Field autoComplete="off" id="doctor_email" name="doctor_email" placeholder="(Ex. johnsmith@gmail.com...)" />

                        <label>First Name: </label>
                        <ErrorMessage name="first_name" component="span"/>
                        <Field autoComplete="off" id="first_name" name="first_name" placeholder="(Ex. John...)"/>

                        <label>Last Name: </label>
                        <ErrorMessage name="last_name" component="span"/>
                        <Field autoComplete="off" id="last_name" name="last_name" placeholder="(Ex. Smith...)"/>

                        <label>Password: </label>
                        <ErrorMessage name="passcode" component="span"/>
                        <Field autoComplete="off" id="passcode" name="passcode" placeholder="(Ex. jsmith1234...)" />

                        <label>Phone Number: </label>
                        <ErrorMessage name="phone_number" component="span"/>
                        <Field autoComplete="off" id="phone_number" name="phone_number" placeholder="Format: XXX-XXX-XXXX"/>

                        <label>Office Street Name: </label>
                        <ErrorMessage name="office_streetname" component="span"/>
                        <Field autoComplete="off" id="office_streetname" name="office_streetname" placeholder="(Ex. 100 James St.)"/>

                        <label>Office City: </label>
                        <ErrorMessage name="office_city" component="span"/>
                        <Field autoComplete="off" id="office_ciy" name="office_city" placeholder="(Ex. Brooklyn...)"/>
                        
                        <label>Office State: </label>
                        <ErrorMessage name="office_state" component="span"/>
                        <Field autoComplete="off" id="office_state" name="office_state" placeholder="(Ex. New York...)"/>

                        <label>Office ZipCode: </label>
                        <ErrorMessage name="office_zipcode" component="span"/>
                        <Field autoComplete="off" id="office_zipcode" name="office_zipcode" placeholder="(Ex. 11201...)"/> 

                        <br />

                        <button className='createProfileBtn' type="submit">Create Profile</button>
                    </Form>
                </Formik>
            </div>
        </div>
        
        
    </div>
  )
}

export default DoctorRegistration