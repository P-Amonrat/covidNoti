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

const South = () => {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceShow, setProvinceShow] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false)
    let south = [];
    console.log("", provinceShow)

    useEffect(() => {
        const userData = async () => {
            axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces').then(function (response) {
                console.log(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let search = response.data;
                south = search
                    .filter(
                        (data) =>
                            data.province == "กระบี่" ||
                            data.province == "ชุมพร" ||
                            data.province == "ตรัง" ||
                            data.province == "นครศรีธรรมราช" ||
                            data.province == "นราธิวาส" ||
                            data.province == "ปัตตานี" ||
                            data.province == "พังงา" ||
                            data.province == "พัทลุง" ||
                            data.province == "ภูเก็ต" ||
                            data.province == "ยะลา" ||
                            data.province == "ระนอง" ||
                            data.province == "สงขลา" ||
                            data.province == "สตูล" ||
                            data.province == "สุราษฎร์ธานี"
                    )
                    .map((x) => {
                        let obj = {
                            southProvince: x.province,
                            southNewCase: x.new_case,
                            southTotalCase: x.total_case,
                            southNewCaseExcludeabroad: x.new_case_excludeabroad,
                            southTotalCaseExcludeabroad: x.total_case_excludeabroad,
                            southNewDeath: x.new_death,
                            southTotalDeath: x.total_death,
                        };
                        return obj;
                    });
                setProvinceList(south);
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
        <Option key={index} value={index}>{x.southProvince}</Option>
    ));

    return (
        <div className='central-page'>
            <div className='head'>
                <p>ยืนยันผู้ติดเชื้อ COVID-19 ทั้งหมดในภาคใต้</p>
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
                                <h1>{provinceShow.southTotalCase}</h1>
                            </div>
                            <div className='block2-top-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.southNewCase}</p>
                            </div>
                        </div>
                        <div className='block2-middle'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด (ไม่รวมต่างประเทศ)</p>
                            <div className='logo2'>
                                <h1>{provinceShow.southTotalCaseExcludeabroad}</h1>
                                <img src='covid-logo2.png' />
                            </div>
                            <div className='block2-middle-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.southNewCaseExcludeabroad}</p>
                            </div>
                        </div>
                        <div className='block2-bottom'>
                            <p>จำนวนผู้เสียชีวิตทั้งหมด</p>
                            <div className='logo3'>
                                <img src='covid-logo3.png' />
                                <h1>{provinceShow.southTotalDeath}</h1>
                            </div>
                            <div className='block2-bottom-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.southNewDeath}</p>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default South;