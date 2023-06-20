const db = require('../connection');

module.exports = class Doctor {
    constructor(newDoctor) {
        if (newDoctor != null) {
            this.doctor_email = newDoctor.doctor_email;
            this.first_name = newDoctor.first_name;
            this.last_name = newDoctor.last_name;
            this.passcode = newDoctor.passcode;
            this.phone_number = newDoctor.phone_number;
            this.office_streetname = newDoctor.streetname;
            this.office_city = newDoctor.office_city;
            this.office_state = newDoctor.office_state;
            this.office_zipcode = newDoctor.office_zipcode;
        }
    }


    insert(values) {
        const sql = 'INSERT INTO Doctor VALUES (?);';
        
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            } else {
                console.log("Insert Success into Doctor Table");
            }
        });
    }
}