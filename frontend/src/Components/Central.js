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

const Central = () => {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceShow, setProvinceShow] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false)
    let central = [];
    console.log("", provinceShow)

    useEffect(() => {
        const userData = async () => {
            axios('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces').then(function (response) {
                console.log(response.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                let search = response.data;
                central = search
                    .filter(
                        (data) =>
                            data.province == "กรุงเทพมหานคร" ||
                            data.province == "กำแพงเพชร" ||
                            data.province == "ชัยนาท" ||
                            data.province == "นครนายก" ||
                            data.province == "นครปฐม" ||
                            data.province == "นครสวรรค์" ||
                            data.province == "นนทบุรี" ||
                            data.province == "ปทุมธานี" ||
                            data.province == "พระนครศรีอยุธยา" ||
                            data.province == "พิจิตร" ||
                            data.province == "พิษณุโลก" ||
                            data.province == "ลพบุรี" ||
                            data.province == "สมุทรปราการ" ||
                            data.province == "สมุทรสงคราม" ||
                            data.province == "สมุทรสาคร" ||
                            data.province == "สระบุรี" ||
                            data.province == "สิงห์บุรี" ||
                            data.province == "สุพรรณบุรี" ||
                            data.province == "สุโขทัย" ||
                            data.province == "อ่างทอง" ||
                            data.province == "อุทัยธานี" ||
                            data.province == "เพชรบูรณ์"
                    )
                    .map((x) => {
                        let obj = {

                            centralProvince: x.province,
                            centralNewCase: x.new_case,
                            centralTotalCase: x.total_case,
                            centralNewCaseExcludeabroad: x.new_case_excludeabroad,
                            centralTotalCaseExcludeabroad: x.total_case_excludeabroad,
                            centralNewDeath: x.new_death,
                            centralTotalDeath: x.total_death,
                        };
                        return obj;
                    });
                setProvinceList(central);
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
        <Option key={index} value={index}>{x.centralProvince}</Option>
    ));

    return (
        <div className='central-page'>
            <div className='head'>
                <p>ยืนยันผู้ติดเชื้อ COVID-19 ทั้งหมดในภาคกลาง</p>
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
                                <h1> {provinceShow.centralTotalCase}</h1>
                            </div>
                            <div className='block2-top-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.centralNewCase}</p>
                            </div>
                        </div>
                        <div className='block2-middle'>
                            <p>จำนวนผู้ติดเชื้อทั้งหมด (ไม่รวมต่างประเทศ)</p>
                            <div className='logo2'>
                                <h1>{provinceShow.centralTotalCaseExcludeabroad}</h1>
                                <img src='covid-logo2.png' />
                            </div>
                            <div className='block2-middle-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.centralNewCaseExcludeabroad}</p>
                            </div>
                        </div>
                        <div className='block2-bottom'>
                            <p>จำนวนผู้เสียชีวิตทั้งหมด</p>
                            <div className='logo3'>
                                <img src='covid-logo3.png' />
                                <h1>{provinceShow.centralTotalDeath}</h1>
                            </div>
                            <div className='block2-bottom-inline'>
                                <p>รายใหม่</p>
                                <p>{provinceShow.centralNewDeath}</p>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default Central;