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

const NorthEast = () => {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceShow, setProvinceShow] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false)
    let northEast = [];
    console.log("", provinceShow)

    useEffect(() => {
        const userData = async () => {
            axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces').then(function (response) {
                console.log(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let search = response.data;
                northEast = search
                    .filter(
                        (data) =>
                            data.province == "กาฬสินธุ์" ||
                            data.province == "ขอนแก่น" ||
                            data.province == "ชัยภูมิ" ||
                            data.province == "นครพนม" ||
                            data.province == "นครราชสีมา" ||
                            data.province == "บึงกาฬ" ||
                            data.province == "บุรีรัมย์" ||
                            data.province == "มหาสารคาม" ||
                            data.province == "มุกดาหาร" ||
                            data.province == "ยโสธร" ||
                            data.province == "ร้อยเอ็ด" ||
                            data.province == "ศรีสะเกษ" ||
                            data.province == "สกลนคร" ||
                            data.province == "สุรินทร์" ||
                            data.province == "หนองคาย" ||
                            data.province == "หนองบัวลำภู" ||
                            data.province == "อำนาจเจริญ" ||
                            data.province == "อุดรธานี" ||
                            data.province == "อุบลราชธานี" ||
                            data.province == "เลย"
                    )
                    .map((x) => {
                        let obj = {
                            northEastProvince: x.province,
                            northEastNewCase: x.new_case,
                            northEastTotalCase: x.total_case,
                            northEastNewCaseExcludeabroad: x.new_case_excludeabroad,
                            northEastTotalCaseExcludeabroad: x.total_case_excludeabroad,
                            northEastNewDeath: x.new_death,
                            northEastTotalDeath: x.total_death,
                        };
                        return obj;
                    });
                setProvinceList(northEast);
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
        <Option key={index} value={index}>{x.northEastProvince}</Option>
    ));

    return (
        <div className='central-page'>
            <div className='head'>
                <p style={{marginBottom: "0px"}}>ยืนยันผู้ติดเชื้อ COVID-19 ทั้งหมด</p>
                <p>ในภาคตะวันออกเฉียงเหนือ</p>
            </div>
            <div className='show-all'>
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
                                <h1>{provinceShow.northEastTotalCase}</h1>
                            </div>
                            <div className='block2-top-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northEastNewCase}</p>
                            </div>
                        </div>
                        <div className='block2-middle'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด (ไม่รวมต่างประเทศ)</p>
                            <div className='logo2'>
                                <h1>{provinceShow.northEastTotalCaseExcludeabroad}</h1>
                                <img src='covid-logo2.png' />
                            </div>
                            <div className='block2-middle-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northEastNewCaseExcludeabroad}</p>
                            </div>
                        </div>
                        <div className='block2-bottom'>
                            <p>จำนวนผู้เสียชีวิตทั้งหมด</p>
                            <div className='logo3'>
                                <img src='covid-logo3.png' />
                                <h1>{provinceShow.northEastTotalDeath}</h1>
                            </div>
                            <div className='block2-bottom-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.northEastNewDeath}</p>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default NorthEast;