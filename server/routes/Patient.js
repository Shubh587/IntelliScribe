const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.js');
const { validateToken } = require("../middleware/auth.js");
require('dotenv').config();

//GET and POST Requests
router.post("/createVisit", validateToken, async (req, res) => {
    const patientEmail = req.body.patient_email;  
    const doctorEmail = req.userInfo.doctor_email;
    const date_of_visit = req.body.date_of_visit;
    const transcript = req.body.text;// audio transcript from patient-physician conversation

    // extract the medical data from the conversation
    const model = await import('../models/Model.mjs')
    const medicalData = await model.extractMedicalData(transcript);

    const medical_history = medicalData.medical_history;
    const symptoms = medicalData.symptoms;
    const medications = medicalData.medications;


    // store the medical data in the Visits relational table in the database
    const thePatient = new Patient();

    const visitInfo = [patientEmail, doctorEmail, date_of_visit, medical_history, symptoms, medications];


    await thePatient.createPatientVisit(visitInfo);

    res.send({succ: "success"});
});

router.get("/getBasicInfo", validateToken, (req, res) => {
    const patientEmail = req.query.data.patient_email;
    const thePatient = new Patient();
    const patientBasicInfo = thePatient.retrieveBasicInfo(patientEmail);

    patientBasicInfo.then(values => {
        res.send(values);
    });
});

router.get("/getBillingInfo", validateToken, (req, res) => {
    const patientEmail = req.query.data.patient_email;
    const thePatient = new Patient();
    const patientBillingInfo = thePatient.retrieveBillingInfo(patientEmail);

    patientBillingInfo.then(values => {
        res.send(values);
    });
});

router.get("/getInsuranceInfo", validateToken, (req, res) => {
    const patientEmail = req.query.data.patient_email;
    const thePatient = new Patient();
    const patientInsuranceInfo = thePatient.retrieveInsuranceInfo(patientEmail);

    patientInsuranceInfo.then(values => {
        res.send(values);
    });
});

router.get("/getPharmacyInfo", validateToken, (req, res) => {
    const patientEmail = req.query.data.patient_email;
    const thePatient = new Patient();
    const patientPharmacyInfo = thePatient.retrievePharmacyInfo(patientEmail);

    patientPharmacyInfo.then(values => {
        res.send(values);
    });
});

router.get("/getPastVisits", validateToken, (req, res) => {
    const doctorEmail = req.userInfo.doctor_email;
    const patientEmail = req.query.data.patient_email;
    const thePatient = new Patient();
    const patientPastVisits = thePatient.retrievePastVisits(patientEmail, doctorEmail);

    patientPastVisits.then(values => {
        res.send(values);
    });
});

router.get("/visit/:patient_email/:date_of_visit", validateToken, (req, res) => {
    const doctorEmail = req.userInfo.doctor_email;
    const patientEmail = req.params.patient_email;
    const visitDate = req.params.date_of_visit;
    const thePatient = new Patient();
    const visitInfo = [patientEmail, doctorEmail, visitDate];
    const patientVisitInfo = thePatient.retrieveVisitInfo(visitInfo);

    patientVisitInfo.then(values => {
        res.send(values);
    });
});


module.exports = router;