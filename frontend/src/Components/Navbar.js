/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import './navbar.css';
import axios from 'axios';

const Navbar = () => {
    const [showSecondNav, setShowSecondNav] = useState(false);

    const handleHamburgerClick = (e) => {
        e.preventDefault();
        setShowSecondNav(!showSecondNav);
    };

    const [date, setDate] = useState();

    useEffect(() => {
        const userData = async () => {
            let response = await axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all');
            setDate(response.data[0].txn_date);
        }
        userData();
    }, [])

    // const resultDate = props.date;
    // const thaiDate = moment(resultDate).format('DD MMMM YYYY')
    // console.log(thaiDate)

    return (
        <div className='nav'>
            <img src='thailand-map.png' className='thailand-map' />
            <div className='header-nav'>
                <label className='label-icon' htmlFor="check" onClick={handleHamburgerClick}>
                    <i className="fas fa-bars"></i>
                </label>
                <div className='date'>
                    <img src='point-date.png' />
                    อัปเดตล่าสุด {date}
                </div>
            </div>
            <nav>
                {showSecondNav ?
                    <ul className='navbar'>
                        <li className='nav-list'><Link to="/">ประเทศไทย</Link></li>
                        <li className='nav-list'><Link to="/central">ภาคกลาง</Link></li>
                        <li className='nav-list'><Link to="/north">ภาคเหนือ</Link></li>
                        <li className='nav-list'><Link to="/south">ภาคใต้</Link></li>
                        <li className='nav-list'><Link to="/east">ภาคตะวันออก</Link></li>
                        <li className='nav-list'><Link to="northEast">ภาคตะวันออกเฉียงเหนือ</Link></li>
                        <li className='nav-list'><Link to="/west">ภาคตะวันตก</Link></li>
                    </ul>
                    :
                    <></>
                }
            </nav>
            <div className='footer'>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar