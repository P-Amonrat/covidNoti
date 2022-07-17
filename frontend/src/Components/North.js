/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/first */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;
import "./layoutProvince.css";

const North = () => {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceShow, setProvinceShow] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false)
    let north = [];
    console.log("", provinceShow)

    useEffect(() => {
        const userData = async () => {
            axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces').then(function (response) {
                console.log(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let search = response.data;
                north = search
                    .filter(
                        (data) =>
                            data.province == "น่าน" ||
                            data.province == "พะเยา" ||
                            data.province == "ลำปาง" ||
                            data.province == "ลำพูน" ||
                            data.province == "อุตรดิตถ์" ||
                            data.province == "เชียงราย" ||
                            data.province == "เชียงใหม่" ||
                            data.province == "แพร่" ||
                            data.province == "แม่ฮ่องสอน"
                    )
                    .map((x) => {
                        let obj = {
                            northProvince: x.province,
                            northNewCase: x.new_case,
                            northTotalCase: x.total_case,
                            northNewCaseExcludeabroad: x.new_case_excludeabroad,
                            northTotalCaseExcludeabroad: x.total_case_excludeabroad,
                            northNewDeath: x.new_death,
                            northTotalDeath: x.total_death,
                        };
                        return obj;
                    });
                setProvinceList(north);
            })
        }
        userData();
    }, [])
    console.log(provinceList);

    const onChange = (value) => {
        console.log(`selected ${value}`);
        console.log(provinceList[value]);
        setProvinceShow(provinceList[value])
        setIsDisplay(true);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const province = provinceList.map((x, index) => (
        <Option key={index} value={index}>{x.northProvince}</Option>
    ));

    return (
        <div className='central-page'>
            <div className='head'>
                <p>ยืนยันผู้ติดเชื้อ COVID-19 ทั้งหมดในภาคเหนือ</p>
            </div>
            <div className='showall'>
                <div className='block1'>
                    <h2>เลือกจังหวัด : </h2>
                    <Select
                        showSearch
                        placeholder="Select a province"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        {province}
                    </Select>
                </div>
                {isDisplay ?
                    <div className='block2' >
                        <div className='block2-top'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด</p>
                            <div className='logo'>
                                <img src="covid-logo.png" />
                                <h1>{provinceShow.northTotalCase}</h1>
                            </div>
                            <div className='block2-top-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northNewCase}</p>
                            </div>
                        </div>
                        <div className='block2-middle'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด (ไม่รวมต่างประเทศ)</p>
                            <div className='logo2'>
                                <h1>{provinceShow.northTotalCaseExcludeabroad}</h1>
                                <img src='covid-logo2.png' />
                            </div>
                            <div className='block2-middle-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northNewCaseExcludeabroad}</p>
                            </div>
                        </div>
                        <div className='block2-bottom'>
                            <p>จำนวนผู้เสียชีวิตทั้งหมด</p>
                            <div className='logo3'>
                                <img src='covid-logo3.png' />
                                <h1>{provinceShow.northTotalDeath}</h1>
                            </div>
                            <div className='block2-bottom-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northNewDeath}</p>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default North;