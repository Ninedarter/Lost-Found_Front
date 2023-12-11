import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {toast} from "react-toastify";
import axiosInstance from "../../../api/customAxios";

const ChangePassword = ({close}) => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const onSubmit = () => {
        if(oldPassword.length <=0) {
            toast.error("Input old password")
            return;
        }
        if(newPassword.length<4) {
            toast.error("New password too short. Min. 4")
            return;
        }
        if(newPassword.length>32) {
            toast.error("New password too long. Max. 32")
            return;
        }
        if(newPassword === oldPassword) {
            toast.error("New password match old password")
            return;
        }
        if(newPassword !== newPassword2) {
            toast.error("Passwords do not match")
            return;
        }

        axiosInstance.patch("/api/v1/users", {
            "currentPassword": oldPassword,
            "newPassword": newPassword,
            "confirmationPassword": newPassword2
        })
            .then((response) => {
                toast.success("Password Changed Successfully!")
                close()
            })
            .catch(() => {
                toast.error("Old password is incorrect")
            })
    }

    return <div style={{display: "flex", flexDirection:"column", gap: "25px"}}>
        <div></div>
       <span className="p-float-label">
            <InputText id="oldpassword" value={oldPassword}
                       type={"password"}
                       onChange={(e) => setOldPassword(e.target.value)}/>
            <label htmlFor="oldpassword">Old Password</label>
        </span>

        <span className="p-float-label">
            <InputText id="newpassword" value={newPassword}
                       type={"password"}
                       onChange={(e) => setNewPassword(e.target.value)}/>
            <label htmlFor="newpassword">New Password</label>
        </span>

        <span className="p-float-label">
            <InputText id="newpassword2" value={newPassword2}
                       type={"password"}
                       onChange={(e) => setNewPassword2(e.target.value)}/>
            <label htmlFor="newpassword2">Repeat New Password</label>
        </span>

        <Button label={"Submit"} onClick={() => onSubmit()}></Button>
    </div>
};

export default ChangePassword;