import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '55vw',
    height: '80vh',
    backgroundColor: 'white',
    position: 'fixed',
    zIndex: 50,
    right: '11rem',
    boxShadow: '1px 2px 5px 0px rgba(81, 80, 80, 0.5)',
    borderRadius: '10px',
    overflowY: 'scroll',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    color: 'blue',
};

const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const labelStyle = {
    fontSize: 'larger',
    fontWeight: '500',
    fontFamily: 'serif',
    marginBottom: '5px',
};

const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const rowStyle = {
    display: 'flex',
    gap: '20px',
};

const selectStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

export default function Companyhome(props) {
    const navigate = useNavigate()
    const [addcomp, setAddcomp] = useState(0);
    const initialCompanydetails = {
        CompanyName: '',
        CTC: '',
        Base: '',
        Jobrole: '',
        EligibleBranches: '',
        EligibleBatches: '',
        CGPA: '',
        PWD: '',
        ActiveBacklogs: '',
        NoofIntakes: '',
        NoofInterviewRounds: '',
        Description: '',
        DriveStartDate: '',
        DriveEndDate: '',
        Status: '',
    };
    const [companydetails, addcompanydetails] = useState(initialCompanydetails);
    const [companydt, setcompanydt] = useState([]);

    const handleonchange = (e) => {

        const { name, value } = e.target;
        const newcompanydetails = { ...companydetails };
        newcompanydetails[name] = value;
        addcompanydetails(newcompanydetails);
    };

    const handonchange = async (id, e) => {
        e.preventDefault();
        const { value } = e.target;

        // Update local state
        setcompanydt(companydt =>
            companydt.map(element =>
                element._id === id ? { ...element, Status: value } : element
            )
        );

        const data = {
            _id: id,
            Status: value
        };

        try {
            const response = await fetch('http://localhost:2025/api/updatecompanydetails', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (json.error === false) {
                alert(json.message);
            } else {
                alert('Update failed: ' + json.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const submitcompanydetails = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:2025/api/insertcompanydetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companydetails),
            });
            const json = await response.json();
            if (json.success === true) {
                alert(json.message);
                addcompanydetails(initialCompanydetails);
            } else {
                alert('Failed to insert');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const companydata = async () => {
        try {
            const response = await fetch('http://localhost:2025/api/gettingcompanydetails', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            console.log(json.data);

            if (json.success === true) {
                setcompanydt(json.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const addcompany = () => {
        setAddcomp(1);
    };

    const getcompanyid = (element, e) => {

       
        if (props.tempcomp === true) {
            props.settempcomp(false)
            props.setcompanydt(element);
            navigate("/home/tools");
        }

    }

    useEffect(() => {
        companydata();

    }, []);
    return (
        <div>
            <div className="main1">
                {addcomp === 1 ? (
                    <div className="ch1" style={containerStyle}>
                        <div style={sectionStyle}>
                            <p style={labelStyle}>Company Name:</p>
                            <input
                                name="CompanyName"
                                type="text"
                                value={companydetails.CompanyName}
                                style={inputStyle}
                                onChange={handleonchange}
                            />
                        </div>
                        <div className="Salary" style={rowStyle}>
                            <div className="ctc" style={sectionStyle}>
                                <p style={labelStyle}>CTC :</p>
                                <input
                                    name="CTC"
                                    type="text"
                                    value={companydetails.CTC}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                            <div className="Base" style={sectionStyle}>
                                <p style={labelStyle}>Base :</p>
                                <input
                                    name="Base"
                                    type="text"
                                    value={companydetails.Base}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                        </div>
                        <div style={sectionStyle}>
                            <p style={labelStyle}>Job Role</p>
                            <input
                                name="Jobrole"
                                type="text"
                                value={companydetails.Jobrole}
                                style={inputStyle}
                                onChange={handleonchange}
                            />
                        </div>
                        <div className="Branches" style={rowStyle}>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>Eligible Branches:</p>
                                <input
                                    name="EligibleBranches"
                                    type="text"
                                    value={companydetails.EligibleBranches}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>Eligible Batches:</p>
                                <input
                                    name="EligibleBatches"
                                    type="text"
                                    value={companydetails.EligibleBatches}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                        </div>
                        <div className="cgpa" style={rowStyle}>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>CGPA :</p>
                                <input
                                    name="CGPA"
                                    type="text"
                                    value={companydetails.CGPA}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>PWD :</p>
                                <select
                                    name="PWD"
                                    value={companydetails.PWD}
                                    style={selectStyle}
                                    onChange={handleonchange}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>Active Backlogs :</p>
                                <select
                                    name="ActiveBacklogs"
                                    value={companydetails.ActiveBacklogs}
                                    style={selectStyle}
                                    onChange={handleonchange}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="nointakes" style={rowStyle}>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>No Of Intakes:</p>
                                <input
                                    name="NoofIntakes"
                                    value={companydetails.NoofIntakes}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>No of Interview Rounds :</p>
                                <input
                                    name="NoofInterviewRounds"
                                    value={companydetails.NoofInterviewRounds}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>Start Date:</p>
                                <input
                                    name="DriveStartDate"
                                    value={companydetails.DriveStartDate}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                            <div style={sectionStyle}>
                                <p style={labelStyle}>End Date:</p>
                                <input
                                    name="DriveEndDate"
                                    value={companydetails.DriveEndDate}
                                    style={inputStyle}
                                    onChange={handleonchange}
                                />
                            </div>
                        </div>
                        <div style={sectionStyle}>
                            <p style={labelStyle}>Status</p>
                            <select
                                name="Status"
                                value={companydetails.Status}
                                style={selectStyle}
                                onChange={handleonchange}
                            >
                                <option value="">Select</option>
                                <option value="OnGoing">OnGoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Trying">Trying</option>
                            </select>
                        </div>
                        <div style={sectionStyle}>
                            <p style={labelStyle}>Description:</p>
                            <input
                                name="Description"
                                value={companydetails.Description}
                                style={inputStyle}
                                onChange={handleonchange}
                            />
                        </div>
                        <button onClick={submitcompanydetails}>
                            <p style={labelStyle}>Submit</p>
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}

                <div className="tcont">
                    <div className="nsacont">
                        <h1>Companies</h1>
                        <input className="inputsearch"></input>
                        <button className="button1" onClick={addcompany}>
                            ADD
                        </button>
                    </div>

                    <hr />
                    <div className="sscont">
                        <div className="sscont1" >
                            {companydt.map((element, value) => (
                                <div className="sscont2" key={element._id} onClick={(e) => { getcompanyid(element) }}>
                                    <div className="sscont3">
                                        <div>
                                            <h2>{element.CompanyName}</h2>
                                        </div>
                                        <div className="ssimg"></div>
                                    </div>
                                    <hr></hr>
                                    <div className="sscont3">
                                        <p className="sspara2">CTC: </p>
                                        <p className="sspara3">{element.CTC}</p>
                                    </div>
                                    <div className="sscont3">
                                        <p className="sspara2">Jobrole: </p>
                                        <p className="sspara3">{element.Jobrole}</p>
                                    </div>
                                    <div className="sscont3">
                                        <p className="sspara2">EligibleBranches: </p>
                                        <p className="sspara3">{element.EligibleBranches}</p>
                                    </div>
                                    <div className="sscont3">
                                        <p className="sspara2"  >Status:</p>

                                        <select
                                            className="sspara3"
                                            name="Status"
                                            value={element.Status}

                                            onChange={(e) => handonchange(element._id, e)}
                                            style={{marginLeft:"1rem"}}
                                        >
                                            <option value="OnGoing">OnGoing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Trying">Trying</option>
                                        </select>
                                    </div>
                                    <div className="sscont3">
                                        <Link to="">View all</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}
