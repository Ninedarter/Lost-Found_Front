import React, { useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import userService from '../services/userService'
import styles from '../components/LoginForm.css'

const LoginForm = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const navigate = useNavigate()

//   const onSubmit = async (e) => {
//     e.preventDefault()

//     const LoginForm = {
//       email: email,
//       password: password,
//     }
//     userService.login(LoginForm)

//     setEmail('')
//     setPassword('')
//     console.log('user logged in')

//     if (email === 'admin@mail.com') {
//       navigate("/adminpage");
//     } else {
//       navigate("/userpage");
//     }
//     }


  return (
    <div className="loginbody">
      <div className="loginForm">
        <h1>Login</h1>
        <form 
        // onSubmit={onSubmit}
        >
          <div>
            <div className="loginformcontrol">
              <input
                type="text"
                required
                // value={email}
                // onChange={(e) => {
                //   setEmail(e.target.value)
                // }}
              ></input>
              <label>Email</label>
            </div>

            <div className="loginformcontrol">
              <input
                type="password"
                required
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value)
                // }}
              ></input>
              <label>Password</label>
            </div>

            <button className="loginbtn" type="submit">
              Login
            </button>

            <p className="logintext">
              Don't have an account? 
              {/* <Link to="/">Register</Link>{' '} */}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
