import React, {useState} from 'react'

import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

import "./LoginForm.css";
import axiosInstance from "../../api/customAxios";
import {useAuth} from "../../provider/authProvider";
import {useNavigate} from "react-router-dom";
import {show} from "../../App";
import {toast} from "react-toastify";

const LoginForm = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();


        axiosInstance.post("/api/v1/auth/authenticate", {
            "email": email,
            "password": password
        })
            .then(response => {
                setToken(response.data.access_token)
                navigate("/main/index")
            })
            .catch(error => {
                toast.error("Wrong email or password!");
                if (error.response) {
                    console.error("Error status:", error.response.status);
                    console.error("Error data:", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
            });


    };

    return (
        <Card title="Login">
            <div className={"login-form-main"}>
                  <span className="p-float-label">
                <InputText id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="email">Email</label>
            </span>
                <span className="p-float-label">
                <InputText id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type={"password"}
                           style={{width: "100%"}}
                />
                <label htmlFor="password">Password</label>
            </span>


                <Button label="Submit"
                        disabled={email.length === 0 || password.length === 0}
                        onClick={(e) => handleSubmit(e)}
                />
            </div>
        </Card>
    )
}


export default LoginForm