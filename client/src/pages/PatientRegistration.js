import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../components/DoctorNavbar';
import "../App.css";

function PatientRegistration() {

    let navigate = useNavigate();

    const initialValues = {
        patient_email: "",
        first_name: "",
        last_name: "",
        streetname: "",
        city: "",
        state: "",
        zipcode: "",
        sex: "",
        gender: "",
        age: "",
        date_of_birth: "",
        phone_number: "",
        profession: "",
        card_number: "",
        expiration_date: "",
        insurance_name: "",
        policy_num: "",
        group_num: "",
        copay: "",
        pharmacy_name: "",
        pharmacy_streetname: "",
        pharmacy_city: "",
        pharmacy_state: "",
        pharmacy_zipcode: ""
    };

    const validationSchema = Yup.object().shape({
        patient_email: Yup.string().email().required("Must enter an email!"),
        first_name: Yup.string().required("Must enter your first name!"),
        last_name: Yup.string().required("Must enter your last name!"),
        streetname: Yup.string().required("Must enter the street name of your home address!"),
        city: Yup.string().required("Must enter the city of your home address"),
        state: Yup.string().required("Must enter the state of your home address"),
        zipcode: Yup.string().required("Must enter the zipcode of your home address"),
        sex: Yup.string().required("Must enter your sex!"),
        gender: Yup.string().required("Must enter your gender!"),
        age: Yup.string().required("Must enter your age!"),
        date_of_birth: Yup.string().required("Must enter your date of birth"),
        phone_number:  Yup.string().required("Must enter your phone number!"),
        profession: Yup.string().required("Must enter your profession!"),
        card_number: Yup.string().required("Must enter your credit card number!"),
        expiration_date: Yup.string().required("Must enter your card's expiration date!"),
        insurance_name: Yup.string().required("Must enter the insurance company you use!"),
        policy_num: Yup.string().required("Must enter the policy number!"),
        group_num: Yup.string().required("Must enter the group number!"),
        copay: Yup.string().required("Must enter the copay amount"),
        pharmacy_name: Yup.string().required("Must enter the pharmacy name!"),
        pharmacy_streetname: Yup.string().required("Must enter the street name of your pharmacy!"),
        pharmacy_city: Yup.string().required("Must enter the city of your pharmacy!"),
        pharmacy_state: Yup.string().required("Must enter the state of your pharmacy!"),
        pharmacy_zipcode: Yup.string().required("Must enter the zipcode of your pharmacy!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register/patient", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
              }
        }).then((response) => {
            if(response.data.error) {
                console.log("Failed to create Patient Profile");
                console.log(response.data.error);
                alert(response.data.error);
            } else {
                console.log(typeof data.copay);
                console.log("Successfully created Patient Profile");
                alert("Successfully created Patient Profile");
                navigate("/doctor/home");

            }
        });
    };

  return (
    <div className="PatientRegistrationPage">
        <DoctorNavbar />
        <div className='body'>
            <h1>Register Your Information:</h1>
            <br />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <h2>Basic Information: </h2>
                    <label>Email: </label>
                    <ErrorMessage name="patient_email" component="span"/>
                    <Field autoComplete="off" id="patient_email" name="patient_email" placeholder="(Ex. johnsmith@gmail.com...)" />

                    <label>First Name: </label>
                    <ErrorMessage name="first_name" component="span"/>
                    <Field autoComplete="off" id="first_name" name="first_name" placeholder="(Ex. John...)"/>

                    <label>Last Name: </label>
                    <ErrorMessage name="last_name" component="span"/>
                    <Field autoComplete="off" id="last_name" name="last_name" placeholder="(Ex. Smith...)"/>
                    
                    <br />
                    <br />

                    <label>Home Street Name: </label>
                    <ErrorMessage name="streetname" component="span"/>
                    <Field autoComplete="off" id="streetname" name="streetname" placeholder="(Ex. 100 James St.)"/>

                    <label>Home City: </label>
                    <ErrorMessage name="city" component="span"/>
                    <Field autoComplete="off" id="city" name="city" placeholder="(Ex. Brooklyn...)"/>
                    
                    <label>Home State: </label>
                    <ErrorMessage name="state" component="span"/>
                    <Field autoComplete="off" id="state" name="state" placeholder="(Ex. New York...)"/>

                    <label>Home ZipCode: </label>
                    <ErrorMessage name="zipcode" component="span"/>
                    <Field autoComplete="off" id="zipcode" name="zipcode" placeholder="(Ex. 11201...)"/> 

                    <br />
                    <br />

                    <label>Sex: </label>
                    <ErrorMessage name="sex" component="span"/>
                    <Field autoComplete="off" id="sex" name="sex" placeholder="(Ex. Male...)"/> 

                    <label>Gender: </label>
                    <ErrorMessage name="gender" component="span"/>
                    <Field autoComplete="off" id="gender" name="gender" placeholder="(Ex. Masculine...)"/> 

                    <label>Age: </label>
                    <ErrorMessage name="age" component="span"/>
                    <Field autoComplete="off" id="age" name="age" placeholder="(Ex. 34)"/> 

                    <label>Date of Birth: </label>
                    <ErrorMessage name="date_of_birth" component="span"/>
                    <Field autoComplete="off" id="date_of_birth" name="date_of_birth" placeholder="(Format: YYYY-MM-DD)"/> 

                    <label>Phone Number: </label>
                    <ErrorMessage name="phone_number" component="span"/>
                    <Field autoComplete="off" id="phone_number" name="phone_number" placeholder="(Format: XXX-XXX-XXXX)"/>

                    <label>Profession: </label>
                    <ErrorMessage name="profession" component="span"/>
                    <Field autoComplete="off" id="profession" name="profession" placeholder="(Ex. Doctor)"/>

                    <br />
                    <br />

                    <h2>Billing Information:</h2>

                    <label>Card Number: </label>
                    <ErrorMessage name="card_number" component="span"/>
                    <Field autoComplete="off" id="card_number" name="card_number" placeholder="(Format: XXXXXXXXXXXXXXXX)"/>

                    <label>Expiration Date: </label>
                    <ErrorMessage name="expiration_date" component="span"/>
                    <Field autoComplete="off" id="expiration_date" name="expiration_date" placeholder="(Format: YYYY-MM-DD)"/>

                    <br />
                    <br />

                    <h2>Insurance Info: </h2>

                    <label>Insurance Name: </label>
                    <ErrorMessage name="insurance_name" component="span"/>
                    <Field autoComplete="off" id="insurance_name" name="insurance_name" placeholder="(Ex. United Healthcare)"/>

                    <label>Policy Number: </label>
                    <ErrorMessage name="policy_num" component="span"/>
                    <Field autoComplete="off" id="policy_num" name="policy_num" placeholder="(Fotmat: XXX-XXXX-XXXX)"/>

                    <label>Group Number: </label>
                    <ErrorMessage name="group_num" component="span"/>
                    <Field autoComplete="off" id="group_num" name="group_num" placeholder="(Ex. 123456)"/>

                    <label>Copay: </label>
                    <ErrorMessage name="copay" component="span"/>
                    <Field autoComplete="off" id="copay" name="copay" placeholder="(Format: 34.56)"/>

                    <br />
                    <br />

                    <h2>Pharmacy Info: </h2>

                    <label>Pharmacy Name: </label>
                    <ErrorMessage name="pharmacy_name" component="span"/>
                    <Field autoComplete="off" id="pharmacy_name" name="pharmacy_name" placeholder="(Ex. CVS)"/>

                    <label>Pharmacy Street Name: </label>
                    <ErrorMessage name="pharmacy_streetname" component="span"/>
                    <Field autoComplete="off" id="pharmacy_streetname" name="pharmacy_streetname" placeholder="(Ex. 200 James St.)"/>

                    <label>Pharmacy City: </label>
                    <ErrorMessage name="pharmacy_city" component="span"/>
                    <Field autoComplete="off" id="pharmacy_city" name="pharmacy_city" placeholder="(Ex. Brooklyn...)"/>
                    
                    <label>Pharmacy State: </label>
                    <ErrorMessage name="pharmacy_state" component="span"/>
                    <Field autoComplete="off" id="pharmacy_state" name="pharmacy_state" placeholder="(Ex. New York...)"/>

                    <label>Pharmacy ZipCode: </label>
                    <ErrorMessage name="pharmacy_zipcode" component="span"/>
                    <Field autoComplete="off" id="pharmacy_zipcode" name="pharmacy_zipcode" placeholder="(Ex. 11201...)"/> 

                    <br />
                    <br />

                    <button className='createProfileBtn' type="submit">Create Profile</button>
                </Form>
            </Formik>
        </div>
        
    </div>
  )
}

export default PatientRegistration