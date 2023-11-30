import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Menubar} from "primereact/menubar";
import {useAuth} from "../../provider/authProvider";

const NavigationBar = () => {
    const navigate = useNavigate();
    const {token} = useAuth()
    const check = !!token

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
            label: 'Logout',
            command: () => {
                navigate('/main/logout')
            },
            visible:check
        }
    ];

    const where = check?"/main/index":"/"

    const start = <Link to={where} style={{margin:"5px"}}>
        <img src={"/icona.png"} alt={":("} width={"30px"} />
    </Link>

    return <Menubar start={start} model={items} style={{height:"40px"}}/>
};

export default NavigationBar;