import React, {useState} from 'react';
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import UserInfoWindow from "../InfoWindow/UserInfoWindow";

const UserPanel = () => {
    return (
      <div className="userpanel">
        <div>
        <img src="https://moneydoneright.com/wp-content/uploads/lost-wallet-1500x370.jpg" style={{width:"100vw", height:"250px", margin:"0", padding:"0"}}></img>
          <Card title={"Your User Panel"}>
            <UserInfoWindow self={true}/>
          </Card>
          </div>
        </div>
    );
};

export default UserPanel;