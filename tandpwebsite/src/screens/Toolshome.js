import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Toolshome(props) {

    const navigate = useNavigate()
    function convertIntegersToStrings(array) {
        return array.map(obj => {
            let newObj = {};
            Object.keys(obj).forEach(key => {
                newObj[key] = typeof obj[key] === 'number' ? obj[key].toString() : obj[key];
            });
            return newObj;
        });
    }
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const uploadSheet = async () => {

        const formData = new FormData();
        formData.append('sheetFile', selectedFile);
        try {
            const response = await fetch('http://localhost:2025/api/changingsheettodata', {
                method: 'POST',

                body: formData
            })
            const json = await response.json();
            if (json.success === true) {
                alert("Successfully fetched googlesheet data");
                const data = json.data;
                const newdata = convertIntegersToStrings(data)

                try {
                    const response1 = await fetch("http://localhost:2025/api/insertingmasterstudentdetails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newdata)
                    })
                    const json1 = await response1.json()
                    if (json1.success === true) {
                        alert("succesfully master data inserted")
                    }
                } catch (error) {
                    console.log(error.message)

                }
            }
        } catch (error) {
            console.log(error.message);

        }

    }

    //  comparing and filterring
   
    const getcompanydetails = (e) => {
        e.preventDefault()
        props.settempcomp(true);
        navigate("/home/Companyhome")

    }
    const comparematchesandcompany = async (data) => {

        const { ...companydata } = props.companydt;
        console.log(companydata)
        console.log(data)

        const matches2 = []
        const mismatches2 = []
        for (let ele of data) {

            if (ele.CGPA < companydata.CGPA || !companydata.EligibleBranches.includes(ele.Branch)) {
                mismatches2.push(ele)

            }
            else {
                let temp = companydata.ActiveBacklogs;
                if (temp === "No") {
                    let num1 = parseInt(ele.Activebacklogs, 10);
                    let num2 = parseInt("0", 10)
                    if (num2 > num1) {
                        mismatches2.push(ele)
                    }
                    else {
                        if (ele.FTE === 'NULL') {
                            matches2.push(ele);

                        }
                        else {
                            mismatches2.push(ele);
                        }

                    }

                }
                else {
                    if (ele.FTE === 'NULL') {
                        matches2.push(ele);

                    }
                    else {
                        mismatches2.push(ele);
                    }
                }

            }

        }

        await convertingdatatosheet(matches2, "matches1");
        await convertingdatatosheet(mismatches2, "unmatched1");

    }
    const convertingdatatosheet = async (data, filename) => {
        const payload = {
            data: data,
            name: filename
        }
        try {
            const response = await fetch("http://localhost:2025/api/changingdatatosheet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            if (json.success) {
                const downloadLink = json.downloadLink;
                console.log(downloadLink)

                if (filename === "unmatched") {
                    alert("xlsc for unmatched created furthe go to companyhome");


                } else {
                    alert("xlsc successfully created")
                }

            } else {
                console.error("Error exporting data to Excel");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const processAndCompareData = async (data1, data2) => {
        console.log(data1)
        console.log(data2)
        const matches = [];
        const mismatches = [];

        data1.forEach(student1 => {
            const student2 = data2.find(student => student.Scholarid === student1.Scholarid);
            if (student2) {
                if (student1.CGPA === student2.CGPA && student1.Activebacklogs === student2.Activebacklogs && student1.Nationality === student2.Nationality) {
                    matches.push(student1);
                } else {
                    mismatches.push(student1);
                }
            }
        });

        await convertingdatatosheet(matches, "matches");
        await convertingdatatosheet(mismatches, "unmatched");
        comparematchesandcompany(matches)
    };

    const getmasterstudentdetails = async (newdata) => {

        try {
            const response = await fetch('http://localhost:2025/api/gettingmasterstudentdetails', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json()

            if (json.success === true) {
                alert("successfully fetched masterstudent details");

                processAndCompareData(json.data, newdata);
            }

        } catch (error) {
            console.log(error.message);

        }


    }
    const gettingsheet1 = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('sheetFile', selectedFile);
        try {
            const response = await fetch('http://localhost:2025/api/changingsheettodata', {
                method: 'POST',

                body: formData
            })
            const json = await response.json();
            if (json.success === true) {
                alert("Successfully fetched googlesheet data");
                const data = json.data;
                const newdata = convertIntegersToStrings(data)
                //   setdata2(newdata)
                getmasterstudentdetails(newdata);


            }
        } catch (error) {
            console.log(error.message);

        }
    }
    const gettingsheet2 = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('sheetFile', selectedFile);
        try {
            const response = await fetch('http://localhost:2025/api/changingsheettodata', {
                method: 'POST',

                body: formData
            })
            const json = await response.json();
            if (json.success === true) {
                alert("Successfully fetched googlesheet data");
                const data = json.data;
                const newdata = convertIntegersToStrings(data)
                //   setdata2(newdata)
                try {
                    const response2 = await fetch('http://localhost:2025/api/updatingmasterstudentdetails', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newdata)

                    })
                    const json = await response2.json();
                    if (json.success === true) {
                        alert("updated succesfully");
                    }

                } catch (error) {
                    console.log(error.message)

                }



            }
        } catch (error) {
            console.log(error.message);

        }

    }
    return (

        <div>

            <div className="main1">
                <h2>Upload a Google Sheet</h2>
                <form id="uploadForm" type="multipart/form-data">
                    <input type="file" id="sheetFile" name="sheetFile" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                    <button type="button" onClick={uploadSheet}>Upload</button>
                </form>


                <div>
                    <h2>Upload a Google Sheet and comapre with masterstudent</h2>

                    <form id="uploadForm" type="multipart/form-data">
                        <input type="file" id="sheetFile" name="sheetFile" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                        <div>
                            <button onClick={getcompanydetails}>Select the company</button>
                        </div>
                        <button type="button" onClick={gettingsheet1}>Upload</button>
                    </form>
                </div>
                <div >
                    <h2>Update Student Details</h2>

                    <form id="uploadForm" type="multipart/form-data">
                        <input type="file" id="sheetFile" name="sheetFile" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                        <button type="button" onClick={gettingsheet2}>Upload</button>
                    </form>
                </div>
            </div>

        </div>
    )

}
export default Toolshome
