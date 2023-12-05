import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "primereact/card";

const AdminMainPanel = () => {

    return (
        <Card title={"Admin Panel"}>
            <ul>
                <li>
                    <Link to={"../found-items"}>Found Items</Link>
                </li>
                <li>
                    <Link to={"../lost-items"}>Lost Items</Link>
                </li>
            </ul>
        </Card>
    );
};

export default AdminMainPanel;