/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
    const [covidCase, setCovidCase] = useState();
    const [newCovidCase, setNewCovidCase] = useState();
    const [recovered, setRecovered] = useState();
    const [newRecovered, setnewRecovered] = useState();
    const [deathed, setDeathed] = useState();
    const [newDeathed, setNewDeathed] = useState();

    useEffect(() => {
        const userData = async () => {
            let response = await axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all');
            console.log(response.data);
            setCovidCase(response.data[0].total_case);
            setNewCovidCase(response.data[0].new_case);
            setRecovered(response.data[0].total_recovered);
            setnewRecovered(response.data[0].new_recovered);
            setDeathed(response.data[0].new_recovered);
            setNewDeathed(response.data[0].new_recovered);
        }
        userData();
    }, [])

    console.log(covidCase);

    return (
        <div className='home-bg'>
            <div className='home'>
            <div className='left-text'>
                <h5>ยืนยันตัวเลขผู้ติเ้ชื้อ</h5>
                <h1>COVID-19</h1>
                <h5>ทั้งหมดในประเทศไทย <img src="Thailand-Flag.png" className='thailand-flag'/></h5>
            </div>
            <div className='right-box'>
                <div className='top-box'>
                    <p>ผู้ติดเชื้อสะสม</p>
                    <h1>{covidCase}</h1>
                    <div className='newCovidCase'>
                        <p>รายใหม่</p>
                        <p> {newCovidCase}</p>
                    </div>
                </div>
                <div className='left-bottom-box'>
                    <p>หายแล้ว</p>
                    <h1>{recovered}</h1>
                    <div className='newRecovered'>
                        <p>รายใหม่ </p>
                        <p>{newRecovered}</p>
                    </div>
                </div>
                <div className='right-bottom-box'>
                    <p>เสียชีวิต</p>
                    <h1>{deathed}</h1>
                    <div className='newDeathed'>
                        <p>รายใหม่</p> 
                        <p>{newDeathed}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default Home