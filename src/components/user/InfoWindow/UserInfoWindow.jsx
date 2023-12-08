import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../api/customAxios";
import {ProgressSpinner} from "primereact/progressspinner";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import ChangePassword from "../changePassword/ChangePassword";
import ReportUser from "../../report/ReportUser";

const UserInfoWindow = ({userId = -1, self = false}) => {
    const [reportDialog, setReportDialog] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [changePassword, setChangePassword] = useState(false)

    const getUserInfo = () => {
        if (userId > 0) {
            axiosInstance.get("/api/v1/users/" + userId)
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
                            <div style={{cursor:"pointer"}} onClick={() => setChangePassword(true)}>Change Password</div>
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
                            <ReportUser id={userInfo.id} close={() => setReportDialog(false)} />
                        </Dialog>

                        <Button className={"danger"} onClick={() => setReportDialog(true)}>REPORT</Button>
                    </>
            }
        </div>

};

export default UserInfoWindow;