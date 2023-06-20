import React from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../components/DoctorNavbar';
import * as Yup from "yup";
import axios from "axios";
import "../App.css";

function Model() {

    let navigate = useNavigate();

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if(!browserSupportsSpeechRecognition) {
        return <span>Your Browser does not support speech to text recognition</span>
    }

    const initialValues = {
        patient_email: "",
        date_of_visit: ""
    }

    const validationSchema = Yup.object().shape({
        patient_email: Yup.string().email().required("Must enter the patient's email!"),
        date_of_visit: Yup.string().required("You must enter the date of the visit!")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/patient/createVisit", {
            patient_email: data.patient_email,
            date_of_visit: data.date_of_visit,
            text: transcript,
            //text: "Pt is 87 yo woman, highschool teacher with past medical history that includes - status post cardiac catheterization in April 2019. She presents today palpitations and chest pressure. HPI: Sleeping trouble on present dosage of Clonidine. Severe Rash on face and leg, slightly itchy. Meds: Vyvanse 50 mgs po at breakfast daily, Clonidine 0.2 mgs -- 1 and 1 / 2 tabs po qhs. HEENT: Boggy inferior turbinates, No oropharyngeal lesion. Lungs : clear. Heart : Regular rhythm. Skin :  Mild erythematous eruption to hairline. Follow-up as scheduled"
        }, 
            {
                headers: 
                { accessToken: sessionStorage.getItem("accessToken") }
            }
        ).then((response) => {
            if(response.data.error) {
                console.log("Creating Visit Error");
                alert(response.data.error);
            } else {
                alert("Successfully submitted visit info");
                console.log("Visit was successfully created");
                navigate('/doctor/home');
            }
        });
    }


  return (
    <div className="modelPage">
        <DoctorNavbar />
        <div className='body'>
            <h1>New Visit</h1>
            <br />
            <div className="audioRecording">
                <h3>Start conversation: </h3>
                <p>{transcript}</p>

                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button className='startBtn' onClick={SpeechRecognition.startListening}>Start</button>
                <button className='stopBtn' onClick={SpeechRecognition.stopListening}>Stop</button>
                <button className='resetBtn' onClick={resetTranscript}>Reset</button>
                <br />
            </div>

            <br />

            <div className="submitVisitInfo">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <label>Patient Email: </label>
                        <ErrorMessage name="patient_email" component="span"/>
                        <Field autoComplete="off" id="patient_email" name="patient_email" placeholder="(Ex. johnsmith@gmail.com...)" />

                        <br />

                        <label>Date of Visit: </label>
                        <ErrorMessage name="date_of_visit" component="span"/>
                        <Field autoComplete="off" id="date_of_visit" name="date_of_visit" placeholder="(Format: YYYY-MM-DD)" />

                        <br />

                        <button className='submitVisit' type="submit"> Submit Visit Info </button>
                    </Form>
                </Formik>
            </div>
        </div>
        
    </div>
  )
}

export default Model