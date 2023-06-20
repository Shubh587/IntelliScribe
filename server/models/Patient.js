const db = require('../connection');

module.exports = class Patient {
    constructor(newPatient) {
        if (newPatient != null) {
            this.patient_email = newPatient.patient_email;
            this.first_name = newPatient.first_name;
            this.last_name = newPatient.last_name;
            this.streetname = newPatient.streetname;
            this.city = newPatient.city;
            this.state = newPatient.state;
            this.zipcode = newPatient.zipcode;
            this.sex = newPatient.sex;
            this.gender = newPatient.gender;
            this.age = newPatient.age;
            this.date_of_birth = newPatient.date_of_birth;
            this.phone_number = newPatient.phone_number;
            this.card_number = newPatient.card_number;
            this.expiration_date = newPatient.expiration_date;
            this.insurance_name = newPatient.insurance_name;
            this.policy_num = newPatient.policy_num;
            this.group_num = newPatient.group_num;
            this.copay = newPatient.copay;
            this.pharmacy_name = newPatient.pharmacy_name;
            this.pharmacy_streetname = newPatient.streetname;
            this.pharmacy_city = newPatient.pharmacy_city;
            this.pharmacy_state = newPatient.pharmacy_state;
            this.pharmacy_zipcode = newPatient.pharmacy_zipcode;
        }
    }


    insert(values) {
        const sql = 'INSERT INTO Patient VALUES (?);';

        console.log(values);
        console.log(Object.keys(values).length);
        
        db.query(sql, [values], (err, result) => {
            if (err) {
                throw err;
            }
            console.log("Insert Success");
        });
    }

    async retrieveBasicInfo(patient_email) {
        const sql = 'SELECT patient_email, first_name, last_name, streetname, city, state, zipcode, sex, gender, age, date_of_birth, phone_number, profession FROM Patient WHERE patient_email = ?;';

        console.log(patient_email);

        const basicInfo = await db.promise().query(sql, [patient_email], (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved Patient EHR Basic Info!");
            }
        });

        console.log(basicInfo);

        return basicInfo[0];
    }

    async retrieveBillingInfo(patient_email) {
        const sql = 'SELECT card_number, expiration_date FROM Patient WHERE patient_email = ?';

        const billingInfo = await db.promise().query(sql, [patient_email], (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved Patient EHR Billing Info!");
            }
        });

        return billingInfo[0];
    }

    async retrieveInsuranceInfo(patient_email) {
        const sql = 'SELECT insurance_name, policy_num, group_num, copay FROM Patient WHERE patient_email = ?';

        const insuranceInfo = await db.promise().query(sql, [patient_email], (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved Patient EHR Insurance Info!");
            }
        });

        return insuranceInfo[0];
    }

    async retrievePharmacyInfo(patient_email) {
        const sql = 'SELECT pharmacy_name, pharmacy_streetname, pharmacy_city, pharmacy_state, pharmacy_zipcode FROM Patient WHERE patient_email = ?';

        const pharmacyInfo = await db.promise().query(sql, [patient_email], (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved Patient EHR Pharmacy Info!");
            }
        });

        return pharmacyInfo[0];
    }

    async retrievePastVisits(patient_email, doctor_email) {
        const sql = 'SELECT patient_email, date_of_visit FROM Visit WHERE patient_email = ? and doctor_email = ?';

        const pastVisits = await db.promise().query(sql, [patient_email, doctor_email], (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved List of Past Visits!");
            }
        });

        return pastVisits[0];
    }

    async retrieveVisitInfo(visitInfo) {
        const sql = 'SELECT medical_history, symptoms, medications, date_of_visit FROM Visit WHERE patient_email = ? and doctor_email = ? and date_of_visit = ?';
        const medVisitInfo = await db.promise().query(sql, visitInfo, (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                console.log("Retrieved Patient Visit Info!");
            }
        });

        return medVisitInfo[0];
    }

    removePatient(patient_email) {
        const sql1 = "DELETE FROM Patient WHERE email = ?";


        db.query(sql1, [patient_email], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Delete Success from Patient Table");
        });

        const sql2 = "DELETE FROM Visits WHERE email = ?";
        
        db.query(sql2, [patient_email], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("DELETE Success from Visits Table");
        });

    }

    async createPatientVisit(values) {
        const sql = 'INSERT INTO Visit VALUES(?)';

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(values);
                console.log(result);
                throw err;
            }
            console.log("Successfully inserted Patient Visit into the Database");
        });
    }
}