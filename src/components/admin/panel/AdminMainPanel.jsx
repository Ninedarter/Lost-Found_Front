import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "primereact/card";

const AdminMainPanel = () => {

    return (
        <Card title={"Admin Panel"}>
            <ul>
                <li style={{fontSize: "18px"}}>
                    <Link style={{color:"#6c6c6c"}} to={"../found-items"}>Found Items</Link>
                </li>
                <li style={{fontSize: "18px"}}>
                    <Link style={{color:"#6c6c6c"}} to={"../lost-items"}>Lost Items</Link>
                </li>
                <li style={{fontSize: "18px"}}>
                    <Link style={{color:"#6c6c6c"}} to={"../reported-users"}>Reported Users</Link>
                </li>
            </ul>
        </Card>
    );
};

export default AdminMainPanel;