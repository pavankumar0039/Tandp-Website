import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupCord() {
    const navigate = useNavigate();
    const initialFormData = {
        name: "",
        email: "",
        scholarId: "",
        authpassword: "",
        password: ""
    };

    const [corddata, setCordData] = useState(initialFormData);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (corddata.authpassword !== "2112027") {
            alert("You are not a coordinator");
            return;
        }

        try {
            const response = await fetch("http://localhost:2025/api/corddetailsinsert", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(corddata)
            });

            const json = await response.json();
            alert(json.message);

            setCordData(initialFormData);
            setError(null);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        }
    };

    const initialloginFormData = {
        email: "",
        password: ""
    };

    const [cordlogindata, setCordloginData] = useState(initialloginFormData);

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setCordloginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const logedin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:2025/api/checklogincord", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cordlogindata)
            });

            const json = await response.json();

            if (json.success) {
                alert(json.message);
                navigate('/home'); 
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        }
    };

    return (
        <div className='body1'>
            <div className="main">
                <input className='input1' type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label className='label1' htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className='input1'
                            type="text"
                            name="name"
                            placeholder="Full name"
                            required
                            value={corddata.name}
                            onChange={handleChange}
                        />
                        <input className='input1'
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={corddata.email}
                            onChange={handleChange}
                        />
                        <input className='input1'
                            type="text"
                            name="scholarId"
                            placeholder="Scholar ID"
                            required
                            value={corddata.scholarId}
                            onChange={handleChange}
                        />
                        <input className='input1'
                            type="password"
                            name="authpassword"
                            placeholder="Authentication Code"
                            required
                            value={corddata.authpassword}
                            onChange={handleChange}
                        />
                        <input className='input1'
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={corddata.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Sign up</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div className="login">
                    <form onSubmit={logedin}>
                        <label className='label1' htmlFor="chk" aria-hidden="true">Login</label>
                        <input className='input1'
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={cordlogindata.email}
                            onChange={handleChange1}
                        />
                        <input className='input1'
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={cordlogindata.password}
                            onChange={handleChange1}
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
