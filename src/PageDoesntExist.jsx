import React from 'react';
import {Card} from "primereact/card";
import {Link} from "react-router-dom";

const PageDoesntExist = () => {
    return <Card title={"404 - Page not found."}>
        <Link to={"/main/index"}>
            Return to main menu
        </Link>
    </Card>
};

export default PageDoesntExist;