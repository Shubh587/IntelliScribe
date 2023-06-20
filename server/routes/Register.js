const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor.js');
const Patient = require('../models/Patient.js');
const { validateToken } = require("../middleware/auth.js");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const {doctor_email, first_name, last_name, passcode, phone_number, office_streetname, office_city, office_state, office_zipcode} = req.body;

    bcrypt.hash(passcode, 10).then((hash) => {
        const info = [doctor_email, first_name, last_name, hash, phone_number, office_streetname, office_city, office_state, office_zipcode];

        const theDoctor = new Doctor();
        theDoctor.insert(info);

        res.send("Sucessfully created doctor profile");
    });

});


router.post('/patient', validateToken, async (req, res) => {
    const formAnswers = req.body;

    const patientData = [formAnswers.patient_email, formAnswers.first_name, formAnswers.last_name, formAnswers.streetname, formAnswers.city, formAnswers.state, formAnswers.zipcode, formAnswers.sex, formAnswers.gender, formAnswers.age, formAnswers.date_of_birth, formAnswers.phone_number, formAnswers.profession, formAnswers.card_number, formAnswers.expiration_date, formAnswers.insurance_name, formAnswers.policy_num, formAnswers.group_num, formAnswers.copay, formAnswers.pharmacy_name, formAnswers.pharmacy_streetname, formAnswers.pharmacy_city, formAnswers.pharmacy_state, formAnswers.pharmacy_zipcode];

    const thePatient = new Patient();
    thePatient.insert(patientData);

    res.send("Successfully created patient profile!");
});

module.exports = router;

