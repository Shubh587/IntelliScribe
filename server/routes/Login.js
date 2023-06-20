const express = require('express');
const router = express.Router();
const db = require('../connection');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const {doctor_email, passcode} = req.body;

    const sql = "SELECT doctor_email, passcode FROM Doctor WHERE doctor_email=?";

    db.query(sql, [doctor_email], (err, result) => {
        if(err) {
            res.send({error: err});
        }

        if (result.length > 0) {
            bcrypt.compare(passcode, result[0].passcode, (error, response) => {
                if (response) {
                    console.log("Success! Logged in");

                    const accessToken = sign({ doctor_email: doctor_email, typeofUser: "doctor"}, "intelliscribe_token");
                    res.json(accessToken);  //will set accesstoken to session stroage in frontend
                } else {
                    res.json({error: "Wrong email/pass combo"});
                }
            });
        } else {
            res.send({error: "User doesn't exist"});
        }
    });
});

module.exports = router;