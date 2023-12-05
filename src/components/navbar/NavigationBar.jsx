import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Menubar} from "primereact/menubar";
import {useAuth} from "../../provider/authProvider";
import {jwtDecode} from "jwt-decode";

const NavigationBar = () => {
    const navigate = useNavigate();
    const {token} = useAuth()
    const check = !!token
    const adminPermission = token?jwtDecode(token, {header:false}).roles.includes("ROLE_ADMIN"):false

    const items = [
        {
            label: 'Login',
            icon: 'pi pi-fw pi-plus',
            command: () => {
                navigate('/login')
            },
            visible:!check

        },
        {
            label: 'Register',
            command: () => {
                navigate('/register')
            },
            visible:!check
        },
        {
            label: 'Admin Panel',
            command: () => {
                navigate('/main/admin/panel')
            },
            visible:check && adminPermission
        },
        {
            label: 'Main',
            command: () => {
                navigate('/main/index')
            },
            visible:check
        },
        {
            label: 'Info',
            command: () => {
                navigate('/main/info')
            },
            visible:check
        },
        {
            label: 'Found Items',
            command: () => {
                navigate('/main/found-items')
            },
            visible:check
        },
        {
            label: 'Lost Items',
            command: () => {
                navigate('/main/lost-items')
            },
            visible:check
        },
        {
            label: 'Add Item',
            command: () => {
                navigate('/main/add-item')
            },
            visible:check
        },
        {
            label: 'Logout',
            command: () => {
                navigate('/main/logout')
            },
            visible:check
        },
        {
            button: 'Logout',
            command: () => {
                navigate('/main/logout')
            },
            visible:check
            
        }
        
    ];

    const where = check?"/main/index":"/"

    const start = <Link to={where} style={{margin:"5px"}}>
        <img src={"/icona.png"} alt={":("} width={"67px"} />
    </Link>

    return <Menubar start={start} model={items} style={{display:"flex", justifyContent:"space-between"}}/>
};

export default NavigationBar;