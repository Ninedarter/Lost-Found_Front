import React, { useState } from 'react'
// import userService from '../services/userService';
// import { Link, useNavigate } from 'react-router-dom';
import styles from '../components/RegisterForm.css'

const RegisterForm = () => {

    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const [email, setEmail] = useState("");
    // const [dob, setDob] = useState("");
    // const [gender, setGender] = useState("");
    // const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //   e.preventDefault();

    //   const RegisterForm = {
    //     name: name,
    //     surname: surname,
    //     email: email,
    //     dob: dob,
    //     gender: gender,
    //     password: password,
    //   }
    //   userService.registerUser(RegisterForm);

    //   setName('');
    //   setSurname('');
    //   setEmail('');
    //   setDob('');
    //   setGender('');
    //   setPassword('');
    //   console.log(RegisterForm);

    //   navigate('/login');
    // }


    return (
        <div className="registerbody">
            <div className="registerForm" >
                <h1>Register</h1>
                <form
                // onSubmit={handleSubmit}
                >

                    <div className="formcontrol">
                        <input type="text" required
                        // value={name}
                        // onChange={(e) => {setName(e.target.value)}}
                        />
                        <label>Name</label>
                    </div>

                    <div className="formcontrol">
                        <input type="text" required
                        // value={surname}
                        // onChange={(e) => {setSurname(e.target.value)}}
                        />
                        <label>Surname</label>
                    </div>

                    <div className="formcontrol">
                        <input type="text" required
                        // value={email}
                        // onChange={(e) => {setEmail(e.target.value)}} 
                        />
                        <label>Email</label>
                    </div>

                    <div className="formcontrol">
                        <input type="date" name="bday" />
                        <label>Birthday</label>
                    </div>

                    <fieldset>
                        <legend>Gender:</legend>
                        <div>
                            <input type="radio" id="man" name="gender" value="man" checked />
                            <label for="man">Man</label>
                        </div>

                        <div>
                            <input type="radio" id="dewey" name="gender" value="woman" />
                            <label for="dewey">Woman</label>
                        </div>
                    </fieldset>


                    <div className="formcontrol">
                        <input type="password" required
                        // value={password}
                        // onChange={(e) => {setPassword(e.target.value)}} 
                        />
                        <label>Password</label>
                    </div>

                    <button
                        className="btn"
                        type="submit"
                    >Register</button>

                    <p className="text">Do already have an account?
                        {/* <Link to="/login">Login</Link>  */}
                    </p>
                </form>
            </div>

        </div>
    )
}


export default RegisterForm