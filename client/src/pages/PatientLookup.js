import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import DoctorNavbar from '../components/DoctorNavbar';
import * as Yup from "yup";

function PatientLookup() {

  const [basicInfo, setBasicInfo] = useState([]);
  const [billingInfo, setBillingInfo] = useState([]);
  const [insuranceInfo, setInsuranceInfo] = useState([]);
  const [pharmacyInfo, setPharmacyInfo] = useState([]);
  const [visitsCollection, setPastVisitsLst] = useState([]);

  let navigate = useNavigate();

  let initialValues = {
    patient_email: ""
  }

  const validationSchema = Yup.object().shape({
    patient_email: Yup.string().email().required("You must input the patient's email!")
  });

  const onSubmit = (data) => {
    // Basic Info GET Request
    axios.get("http://localhost:3001/patient/getBasicInfo", 
      {
        params: { data },
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if(response.data.error) {
        console.log("Error with getting Basic Info");
        console.log(response.data.error);
      } else {
        setBasicInfo(response.data);
      }
    });


    axios.get("http://localhost:3001/patient/getBillingInfo", 
      {
        params: { data },
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if(response.data.error) {
        console.log("Error with getting Billing Info");
        console.log(response.data.error);
      } else {
        setBillingInfo(response.data);
      }
    });

    axios.get("http://localhost:3001/patient/getInsuranceInfo", 
      {
        params: { data },
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if(response.data.error) {
        console.log("Error with getting Insurance Info");
        console.log(response.data.error);
      } else {
        setInsuranceInfo(response.data);
      }
    });

    axios.get("http://localhost:3001/patient/getPharmacyInfo", 
      {
        params: { data },
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if(response.data.error) {
        console.log("Error with getting Pharmacy Info");
        console.log(response.data.error);
      } else {
        setPharmacyInfo(response.data);
      }
    });

    axios.get("http://localhost:3001/patient/getPastVisits", 
      {
        params: { data },
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if(response.data.error) {
        console.log("Error with getting Past Visits Dates");
        console.log(response.data.error);
      } else {
        setPastVisitsLst(response.data);
      }
    });
  }

  return (
    <div className="PatientLookupPage">
      <DoctorNavbar />
      <div className='body'>
        <h1> Patient EHR </h1>
        <div className="searchPatientForm">
            <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema={validationSchema}>
              <Form>
                <label>Patient Email: </label>
                <ErrorMessage name="patient_email" component="span"/>
                <Field className="patient_email" autoComplete="off" id="patient_email" name="patient_email" placeholder="jsmith@gmail.com" />
                <br />
                <button className="searchPatientButton" type="submit">Search Patient EHR</button>
                <br />
              </Form>
            </Formik>
        </div>
        <div className="displayPatientEHR">
            <h2>Basic Info: </h2>
            <br />

            <table>
              <thead>
                <tr>
                  <th>Email: </th>
                  <th>First Name: </th>
                  <th>Last Name: </th>
                  <th>Street Name: </th>
                  <th>City: </th>
                  <th>State: </th>
                  <th>Zip Code: </th>
                  <th>Sex: </th>
                  <th>Gender: </th>
                  <th>Age: </th>
                  <th>Date of Birth: </th>
                  <th>Phone Number: </th>
                  <th>Profession: </th>
                </tr>
              </thead>
              <tbody>
                {basicInfo.map(item => {
                  return (
                    <tr>
                      <td>{item.patient_email}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.streetname}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.zipcode}</td>
                      <td>{item.sex}</td>
                      <td>{item.gender}</td>
                      <td>{item.age}</td>
                      <td>{item.date_of_birth}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.profession}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <br />

            <h2>Billing Info: </h2>
            <table>
              <thead>
                <tr>
                  <th>Card Number: </th>
                  <th>Expiration Date: </th>
                </tr>
              </thead>
              <tbody>
                {billingInfo.map(item => {
                  return (
                    <tr>
                      <td>{item.card_number}</td>
                      <td>{item.expiration_date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <br />

            <h2>Insurance Info: </h2>
            <table>
              <thead>
                <tr>
                  <th>Insurance Name: </th>
                  <th>Policy Num: </th>
                  <th>Group Num: </th>
                  <th>Copay: </th>
                </tr>
              </thead>
              <tbody>
                {insuranceInfo.map(item => {
                  return (
                    <tr>
                      <td>{item.insurance_name}</td>
                      <td>{item.policy_num}</td>
                      <td>{item.group_num}</td>
                      <td>{item.copay}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <br />
            <h2>Pharmacy Info: </h2>
            <table>
              <thead>
                <tr>
                  <th>Pharmacy Name: </th>
                  <th>Streetname: </th>
                  <th>City: </th>
                  <th>State: </th>
                  <th>Zipcode: </th>
                </tr>
              </thead>
              <tbody>
                {pharmacyInfo.map(item => {
                  return (
                    <tr>
                      <td>{item.pharmacy_name}</td>
                      <td>{item.pharmacy_streetname}</td>
                      <td>{item.pharmacy_city}</td>
                      <td>{item.pharmacy_state}</td>
                      <td>{item.pharmacy_zipcode}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            <br />

            <h2>Past Visits: </h2>
            <table>
              <thead>
                <tr>
                  <th>Visit Dates: </th>
                </tr>
              </thead>
              <tbody>
                {visitsCollection.map(item => {
                  return (
                    <tr onClick={() => {navigate(`/patient/visit/${item.patient_email}/${item.date_of_visit}`)}}>
                      <td>{item.date_of_visit}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      </div>

    </div>
  )
}

export default PatientLookup