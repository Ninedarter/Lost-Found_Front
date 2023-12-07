import React, {useState} from 'react';
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {toast} from "react-toastify";
import axiosInstance from "../../api/customAxios";

const ReportUser = ({id, close}) => {
    const [reason, setReason] = useState("")

    const onReportSubmit = () => {
        console.log(reason)
        if (reason.length < 3) {
            toast.warning("Reason too short. Minimum 3 characters")
            return
        }

        axiosInstance.post("/api/v1/users/report", {
            "reportedUserId": id,
            "description": reason
        })
            .then((response) => {
                toast.success("User successfully reported")
                close()
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
    }

    return (
        <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <b>Reason:</b>
                <InputTextarea title={"Reason"}
                               value={reason}
                               onInput={(data) => setReason(data.target.value)}/>
            </div>

            <Button label={"Report"} onClick={() => onReportSubmit()}></Button>
        </div>
    );
};

export default ReportUser;