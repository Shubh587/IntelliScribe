import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import DoctorNavbar from '../components/DoctorNavbar';

function Visit() {
    let {patient_email, date_of_visit} = useParams();

    const [visitInfo, setVisitInfo] = useState([]);

    useEffect(() => {
        fetchVisitData();
    });

    const fetchVisitData = () => {
        axios.get(`http://localhost:3001/patient/visit/${patient_email}/${date_of_visit}`, 
        {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                console.log("Getting Visit Info Error");
                console.log(response.data.error);
            } else {
                setVisitInfo(response.data);
            }
        })
    }

  return (
    <div className="visitInfoPage">
        <DoctorNavbar />
        <div className='body'>
            <h1>Visit Info: </h1>
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Medical History: </th>
                        <br />
                        <th>Symptoms: </th>
                        <br />
                        <th>Medications: </th>
                        <br />
                        <th>Date of Visit: </th>
                        <br />
                    </tr>
                </thead>
                <tbody>
                    {visitInfo.map(item => {
                        return (
                            <tr>
                                <td>{item.medical_history}</td>
                                <br />
                                <td>{item.symptoms}</td>
                                <br />
                                <td>{item.medications}</td>
                                <br />
                                <td>{item.date_of_visit}</td>
                                <br />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='backBtnContainer'>
                <a href='/patient/lookup'>
                    <button className='backBtn'>Back</button>
                </a>
            </div>
        </div>
        
    </div>
  )
}

export default Visit