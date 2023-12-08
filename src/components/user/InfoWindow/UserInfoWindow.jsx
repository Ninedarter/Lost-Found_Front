import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../api/customAxios";
import {ProgressSpinner} from "primereact/progressspinner";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import ChangePassword from "../changePassword/ChangePassword";
import ReportUser from "../../report/ReportUser";
import {useAuth} from "../../../provider/authProvider";
import {jwtDecode} from "jwt-decode";

const UserInfoWindow = ({userId = -1, email = "", self = false}) => {
    const {token} = useAuth()
    const adminPermission = token && token !== "undefined" ? jwtDecode(token, {header: false}).roles.includes("ROLE_ADMIN") : false
    const [reportDialog, setReportDialog] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [changePassword, setChangePassword] = useState(false)


    if (jwtDecode(token, {header: false}).sub === email) {
        self = true;
    }

    const getUserInfo = () => {
        if (userId > 0) {
            axiosInstance.get("/api/v1/users/" + userId)
                .then((response) => {
                    setUserInfo(response.data)
                })
        } else if (email.length > 0) {
            axiosInstance.get("/api/v1/users/email/" + email)
                .then((response) => {
                    setUserInfo(response.data)
                })
        } else {
            axiosInstance.get("/api/v1/users/self")
                .then((response) => {
                    setUserInfo(response.data)
                })
        }
    }

    useEffect(() => {
        getUserInfo()
    }, []);


    return !userInfo ? <ProgressSpinner/>
        :
        <div>
            <b>First Name:</b> {userInfo?.firstname}
            <br/>
            <b>Last Name:</b> {userInfo?.lastname}
            <br/>
            <b>Email:</b> {userInfo?.email}
            <br/>
            <b>Gender:</b> {userInfo?.gender}
            <br/>
            <b>Date Of Birth:</b> {userInfo?.dob}
            <br/>
            <b>Phone Number:</b> {userInfo?.phoneNumber}
            <br/>
            {
                self ?
                    <ul>
                        <li>
                            <div style={{cursor: "pointer"}} onClick={() => setChangePassword(true)}>Change Password
                            </div>
                        </li>
                        <Dialog header={"Change Password"} visible={changePassword}
                                onHide={() => setChangePassword(false)}>
                            <ChangePassword close={() => setChangePassword(false)}/>
                        </Dialog>
                    </ul>
                    :
                    <>
                        <Dialog header={"Report " + userInfo?.email} visible={reportDialog}
                                onHide={() => setReportDialog(false)}>
                            <ReportUser id={userInfo.id} close={() => setReportDialog(false)}/>
                        </Dialog>

                        <Button className={"danger"}
                                onClick={() => setReportDialog(true)}
                                label={"Report"}
                                size={"small"}></Button>
                    </>
            }

            {adminPermission && !self && <>
                <span style={{width: "10px"}}> </span>
                <Button label={"Ban"} size={"small"}/>
            </>}
        </div>

};

export default UserInfoWindow;