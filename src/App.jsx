import React from 'react'

import RegisterForm from './components/register/RegisterForm'
import LoginForm from './components/login/LoginForm'

import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import Home from "./components/home/Home";

import "./App.css";
import {ProtectedRoute} from "./ProtectedRoute";
import Logout from "./components/logout/Logout";
import Main from "./components/main/Main";

import { ToastContainer } from 'react-toastify';

import FoundItemsCard from './components/items/foundItems/FoundItemsCard';
import FoundItemAddForm from './components/items/foundItems/FoundItemAddForm';
import AllLostItems from './components/items/lostItems/AllLostItems';
import {ProtectedAdminRoute} from "./ProtectedAdminRoute";
import AdminMainPanel from "./components/admin/panel/AdminMainPanel";
import FoundItemsAdmin from "./components/admin/panel/foundItems/FoundItemsAdmin";
import LostItemsAdmin from "./components/admin/panel/lostItems/LostItemsAdmin";

import 'react-toastify/dist/ReactToastify.css';
import ReportedPlayersAdmin from "./components/admin/panel/reportedPlayers/ReportedPlayersAdmin";
import UserPanel from "./components/user/panel/UserPanel";
import UserBannedWindow from "./components/banned/UserBannedWindow";
import ItemTypeSelectWindow from "./components/items/ItemTypeSelectWindow";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="banned" element={<UserBannedWindow />}/>
                    <Route path="/main" element={<ProtectedRoute/>}>
                        <Route path="index" element={<Main />}/>

                        <Route path="logout" element={<Logout/>}/>
                        <Route path="lost-items" element={<AllLostItems/>}/>
                        <Route path="found-items" element={<FoundItemsCard />}/>
                        <Route path="add-item" element={<ItemTypeSelectWindow />}/>

                        <Route path={"admin"} element={<ProtectedAdminRoute/>}>
                            <Route path={"panel"} element={<AdminMainPanel />} />

                            <Route path={"found-items"} element={<FoundItemsAdmin />} />
                            <Route path={"lost-items"} element={<LostItemsAdmin />} />
                            <Route path={"reported-users"} element={<ReportedPlayersAdmin />} />
                        </Route>

                        <Route path="user-info" element={<UserPanel />}/>
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