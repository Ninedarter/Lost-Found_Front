import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import {ProgressSpinner} from "primereact/progressspinner";

const UserInfoWindow = ({userId}) => {
    const [userInfo, setUserInfo] = useState()
    const getUserInfo = () => {
        axiosInstance.get("/api/v1/users/" + userId)
            .then((response) => {
                setUserInfo(response.data)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    if(!userInfo) {
        return  <ProgressSpinner />
    }

    return <div>
        <b>First Name:</b> {userInfo?.firstname}
        <br />
        <b>Last Name:</b> {userInfo?.lastname}
        <br />
        <b>Email:</b> {userInfo?.email}
        <br />
        <b>Gender:</b> {userInfo?.gender}
        <br />
        <b>Date Of Birth:</b> {userInfo?.dob}
        <br />
        <b>Phone Number:</b> {userInfo?.phoneNumber}
    </div>

};

export default UserInfoWindow;