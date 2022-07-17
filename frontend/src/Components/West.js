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

const West = () => {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceShow, setProvinceShow] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false)
    let west = [];
    console.log("", provinceShow)

    useEffect(() => {
        const userData = async () => {
            axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces').then(function (response) {
                console.log(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let search = response.data;
                west = search
                    .filter(
                        (data) =>
                            data.province == "กาญจนบุรี" ||
                            data.province == "ตาก" ||
                            data.province == "ประจวบคีรีขันธ์" ||
                            data.province == "ราชบุรี" ||
                            data.province == "เพชรบุรี"
                    )
                    .map((x) => {
                        let obj = {
                            westProvince: x.province,
                            westNewCase: x.new_case,
                            westTotalCase: x.total_case,
                            westNewCaseExcludeabroad: x.new_case_excludeabroad,
                            westTotalCaseExcludeabroad: x.total_case_excludeabroad,
                            westNewDeath: x.new_death,
                            westTotalDeath: x.total_death,
                        };
                        return obj;
                    });
                setProvinceList(west);
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
        <Option key={index} value={index}>{x.westProvince}</Option>
    ));

    return (
        <div className='central-page'>
            <div className='head'>
                <p>ยืนยันผู้ติดเชื้อ COVID-19 ทั้งหมดในภาคตะวันตก</p>
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
                                <h1>{provinceShow.westTotalCase}</h1>
                            </div>
                            <div className='block2-top-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.westNewCase}</p>
                            </div>
                        </div>
                        <div className='block2-middle'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด (ไม่รวมต่างประเทศ)</p>
                            <div className='logo2'>
                                <h1>{provinceShow.westTotalCaseExcludeabroad}</h1>
                                <img src='covid-logo2.png' />
                            </div>
                            <div className='block2-middle-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.westNewCaseExcludeabroad}</p>
                            </div>
                        </div>
                        <div className='block2-bottom'>
                            <p>จำนวนผู้เสียชีวิตทั้งหมด</p>
                            <div className='logo3'>
                                <img src='covid-logo3.png' />
                                <h1>{provinceShow.westTotalDeath}</h1>
                            </div>
                            <div className='block2-bottom-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.westNewDeath}</p>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default West;