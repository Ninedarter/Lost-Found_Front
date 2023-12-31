import React, {useState} from 'react'

import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

import "./RegisterForm.css";
import {Calendar} from "primereact/calendar";
import {RadioButton} from "primereact/radiobutton";
import axiosInstance from "../../api/customAxios";
import {toast} from "react-toastify";
import {useAuth} from "../../provider/authProvider";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const {setToken, setRefreshToken} = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [dob, setDob] = useState()
    const [number, setNumber] = useState("")
    const [gender, setGender] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if(name.length<4) {
            toast.warning("First name too short. Min 4")
            setSubmitted(false)
            return
        }
        if(lastName.length<4) {
            toast.warning("Last name too short. Min 4")
            setSubmitted(false)
            return
        }
        if(email.length<4) {
            toast.warning("Email too short. Min 4")
            setSubmitted(false)
            return
        }
        if(password.length<4) {
            toast.warning("Password too short. Min 4")
            setSubmitted(false)
            return
        }
        if(!!!dob) {
            toast.warning("Please choose date of birth")
            setSubmitted(false)
            return
        }

        if(number.length<6) {
            toast.warning("Number too short. Min 6")
            setSubmitted(false)
            return
        }

        if(!gender) {
            toast.warning("Please select your gender")
            setSubmitted(false)
            return
        }

        if(password !== password2) {
            toast.warning("Passwords do not match")
            setSubmitted(false)
            return
        }

        if(name.length>32) {
            toast.warning("First name too long. Max 32")
            setSubmitted(false)
            return
        }
        if(lastName.length>32) {
            toast.warning("Last name too long. Max 32")
            setSubmitted(false)
            return
        }
        if(email.length>32) {
            toast.warning("Email too long. Max 32")
            setSubmitted(false)
            return
        }
        if(password.length>32) {
            toast.warning("Password too long. Max 32")
            setSubmitted(false)
            return
        }

        if(number.length>32) {
            toast.warning("Number too long. Max 32")
            setSubmitted(false)
            return
        }

        axiosInstance.post("/api/v1/auth/register", {
            "firstname": name,
            "lastname": lastName,
            "email": email,
            "password": password,
            "dob": dob.toISOString().substring(0,10),
            "phoneNumber": number,
            "gender": gender
        })
            .then(response => {
                if(response.data.access_token && response.data.refresh_token) {
                    setToken(response.data.access_token)
                    setRefreshToken(response.data.refresh_token)
                }
                toast.success("Registration successful!")
                navigate("/main/index")
            })
            .catch(error => {
                setSubmitted(false)
                toast.error("Something went wrong. Maybe email is already taken?");
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
        <div className="registration">
        <Card containerStyle={{ elevation: 0, borderColor: "white" }} title="Register">
            <div className={"register-form-main"}>
                <span className="p-float-label">
                    <InputText id="name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: "100%"}}
                    />
                    <label htmlFor="name">First Name</label>
                </span>
                <span className="p-float-label">
                    <InputText id="lastname"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               style={{width: "100%"}}
                    />
                    <label htmlFor="lastname">Last Name</label>
                </span>
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

                <span className="p-float-label">
                    <InputText id="repeatpassword"
                               value={password2}
                               onChange={(e) => setPassword2(e.target.value)}
                               type={"password"}
                               style={{width: "100%"}}
                    />
                    <label htmlFor="password">Repeat Password</label>
                </span>

                <Calendar value={dob}
                          onChange={(e) => setDob(e.value)}
                          placeholder={"Date Of Birth"}
                />

                <span className="p-float-label">
                    <InputText id="number"
                               value={number}
                               onChange={(e) => setNumber(e.target.value)}
                               keyfilter={"int"}
                               style={{width: "100%"}}
                    />
                    <label htmlFor="number">Phone Number</label>
                </span>

                <div className={"gender-form"}>
                    <b>Gender</b>
                    <div className={"gender-form-inside"}>
                        <RadioButton inputId="MALE" name="gender" value="MALE" onChange={(e) => setGender(e.value)}
                                     checked={gender === 'MALE'}/>
                        <label htmlFor="MALE">Male</label>
                    </div>

                    <div className={"gender-form-inside"}>
                        <RadioButton inputId="FEMALE" name="gender" value="FEMALE" onChange={(e) => setGender(e.value)}
                                     checked={gender === 'FEMALE'}/>
                        <label htmlFor="FEMALE">Female</label>
                    </div>
                </div>

                <Button label="SUBMIT"
                        onClick={(e) => handleSubmit(e)}
                        disabled={submitted}
                />
            </div>
        </Card>
        
        </div>
    )
}

export default RegisterForm