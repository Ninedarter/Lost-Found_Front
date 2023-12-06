import React, {useState} from 'react'

import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

import "./LoginForm.css";
import axiosInstance from "../../api/customAxios";
import {useAuth} from "../../provider/authProvider";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const {setToken, setRefreshToken} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if(email.length<4) {
            toast.warning("Email too short. Min. 4")
            setSubmitted(false)
            return
        }

        if(password.length<4) {
            toast.warning("Password too short. Min. 4")
            setSubmitted(false)
            return
        }

        if(email.length>32) {
            toast.warning("Email too long. Max. 32")
            setSubmitted(false)
            return
        }

        if(password.length>32) {
            toast.warning("Password too long. Max. 32")
            setSubmitted(false)
            return
        }


        axiosInstance.post("/api/v1/auth/authenticate", {
            "email": email,
            "password": password
        })
            .then(response => {
                if(response.data.access_token && response.data.refresh_token) {
                    setToken(response.data.access_token)
                    setRefreshToken(response.data.refresh_token)
                }
                navigate("/main/index")
            })
            .catch(error => {
                toast.error("Wrong email or password!");
                setSubmitted(false)
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
                           minLength={4}
                />
                <label htmlFor="email">Email</label>
            </span>
                <span className="p-float-label">
                <InputText id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type={"password"}
                           style={{width: "100%"}}
                           minLength={4}
                />
                <label htmlFor="password">Password</label>
            </span>
            
            <div>
            <img src='https://th.bing.com/th/id/R.8ddf4c8f5b3dfb30ff3edfb4ca6358a3?rik=e%2f6aTxrfLPzEyA&riu=http%3a%2f%2fwww.yourzbs.com%2fwp-content%2fuploads%2f2019%2f06%2fThe-Emotional-Side-Of-Returning-Lost-Objects.jpg&ehk=UrjhuURD%2f3HZ%2bBoNc4uEkhuA6bEn3KJ7YWvo2FTBLJg%3d&risl=&pid=ImgRaw&r=0' style={{height:"310px", borderRadius:"7px"}}></img>
            </div>
            <span>
                <Button label="Submit"
                        onClick={(e) => handleSubmit(e)}
                        style={{width:"100%"}}
                        disabled={submitted}
                />
                </span>
            </div>
        </Card>
    )
}


export default LoginForm