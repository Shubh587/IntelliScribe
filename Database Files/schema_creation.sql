CREATE table Doctor (
	doctor_email varchar(255) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    passcode varchar(400) not null,
    phone_number varchar(50) not null,
    office_streetname varchar(150) not null,
    office_city varchar(100) not null,
    office_state varchar(100) not null,
    office_zipcode varchar(20) not null,
    primary key(doctor_email)
);

CREATE table Patient (
	patient_email varchar(255) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    streetname varchar(150) not null,
    city varchar(100) not null,
    state varchar(50) not null,
    zipcode varchar(20) not null,
    sex varchar(15) not null,
    gender varchar(40) not null,
    age varchar(3) not null,
    date_of_birth char(10) not null,
    phone_number varchar(30) not null,
    profession varchar(30) not null,
    card_number varchar(30) not null,
    expiration_date char(10) not null,
    insurance_name varchar(30) not null,
    policy_num varchar(20) not null,
    group_num varchar(20) not null,
    copay varchar(20) not null,
    pharmacy_name varchar(30) not null,
    pharmacy_streetname varchar(50) not null,
    pharmacy_city varchar(50) not null,
    pharmacy_state varchar(50) not null,
    pharmacy_zipcode varchar(50) not null,
    primary key(patient_email)
);

CREATE table Visit (
	patient_email varchar(255) not null,
    doctor_email varchar(255) not null,
    date_of_visit char(10) not null,
    medical_history varchar(500) not null,
    symptoms varchar(500) not null,
    medications varchar(500) not null,
    primary key(patient_email, doctor_email, date_of_visit),
    foreign key(patient_email) references Patient(patient_email),
    foreign key(doctor_email) references Doctor(doctor_email)
);

INSERT INTO Doctor VALUES
('test123', 'hank', 'ajs', 'skdkfk', '9176554959', 'gkdks', 'ddll', '4fjsjsjs', 'fkskaka')
;

INSERT INTO Patient VALUES 
('email456', 'fname', 'lname', 'str', 'cit', 'state', 'izp', 'sex', 'gend', 'sm', 'sm', 'smsmsms', 'msmsms', 'ssms', 'ssms' 'ssms', 'smsmsms', 'smsmsms', 'smsmsms', '45.43', 'smsmsms', 'smsmsms', 'smsmsms', 'smsmsms', 'smsmsms')
;

INSERT INTO Visit VALUES 
('email456', 'test123', '2020-03-04', 'medhist', 'smyp', 'medications')
;
