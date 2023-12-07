import React, {useState} from 'react';
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import UserInfoWindow from "../InfoWindow/UserInfoWindow";

const UserPanel = () => {
    return (
        <Card title={"Your User Panel"}>
          <UserInfoWindow self={true}/>
        </Card>
    );
};

export default UserPanel;