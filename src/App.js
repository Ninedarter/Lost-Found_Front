import React from 'react'
import MapContainer from './components/MapContainer'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import AllFoundItems from './components/AllFoundItems'
import AllLostItems from './components/AllLostItems'

const App = () => {
  return (
    <div>
      <RegisterForm/>
      <LoginForm/>
      <AllFoundItems/>
      <AllLostItems/>
      <MapContainer/>
    </div>
  )
}

export default App