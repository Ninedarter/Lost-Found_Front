import React, {useRef} from 'react'

import RegisterForm from './components/register/RegisterForm'
import LoginForm from './components/login/LoginForm'

import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import Home from "./components/home/Home";

import "./App.css";
import {ProtectedRoute} from "./ProtectedRoute";
import SuccessMessage from "./components/successMessage";
import Logout from "./components/logout/Logout";
import Main from "./components/main/Main";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllLostItemsList from "./components/lostItems/AllLostItemsList";
import AllFoundItemsList from "./components/foundItems/AllFoundItemsList";
import FoundItemsCard from './components/foundItems/NewFoundItemsCard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1️⃣ Wrap your routes in a pathless layout route */}
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/main" element={<ProtectedRoute/>}>
                        <Route path="index" element={<Main />}/>
                        <Route path="info" element={<SuccessMessage/>}/>
                        <Route path="logout" element={<Logout/>}/>

                        <Route path="lost-items" element={<AllLostItemsList />}/>
                        <Route path="found-items" element={<FoundItemsCard />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Layout() {
    return (
        <>
            <ToastContainer />
            <NavigationBar/>
            <div className={"main-window"}>
                <Outlet/>
            </div>
        </>
    );
}

export default App;