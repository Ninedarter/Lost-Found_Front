import React, {useState} from 'react'

import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

import "./RegisterForm.css";
import {Calendar} from "primereact/calendar";
import {RadioButton} from "primereact/radiobutton";

const RegisterForm = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [dob, setDob] = useState()
    const [number, setNumber] = useState("")
    const [gender, setGender] = useState("")

    return (
        <Card title="Register">
            <div className={"login-form-main"}>
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
                        <RadioButton inputId="male" name="gender" value="Male" onChange={(e) => setGender(e.value)} checked={gender === 'Male'} />
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className={"gender-form-inside"}>
                        <RadioButton inputId="female" name="gender" value="Female" onChange={(e) => setGender(e.value)} checked={gender === 'Female'} />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>



                <Button label="Submit"
                />
            </div>
        </Card>
    )
}

export default RegisterForm