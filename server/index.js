require('./connection');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


// Routers 
const Patient = require('./routes/Patient');
app.use('/patient', Patient);

const Register = require('./routes/Register');
app.use('/register', Register);

const Login = require('./routes/Login');
app.use('/login', Login);

app.listen(3001, () => {
    console.log("Server running on port 3001");
}); // server will run on port 3001
