import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Card} from "primereact/card";
import axiosInstance from "../../../../api/customAxios";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import UserInfoWindow from "../../../user/InfoWindow/UserInfoWindow";
import {ConfirmPopup} from "primereact/confirmpopup";
import {toast} from "react-toastify";

const ReportedPlayersAdmin = () => {
    const [reportedPlayers, setReportedPlayers] = useState([])
    const [expandedRows, setExpandedRows] = useState([]);
    const buttonEl = useRef(null);
    const [userDialog, setUserDialog] = useState(false)
    const [dialogHeader, setDialogHeader] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axiosInstance.get("/api/v1/users/reports/all")
            .then((response) => {
                setReportedPlayers(response.data)
            })
    }

    const reportTimes = (rowData) => rowData.reports.length;


    const expandedTable = (rowData) => {
        return <Card>
            <DataTable title={"Reported Players"}
                       value={rowData.reports}
                       size={"small"}
            >
                <Column header={"Description"} field={"description"}/>
                <Column header={"Date"} field={"reportTime"}/>
                <Column header={"Reportee"}
                        body={(rowData) => userCheckButton(rowData.reportee.email)}/>
            </DataTable>
        </Card>
    }

    const userCheckButton = (email) => {
        return <>

            <Button onClick={() => {
                setUserDialog(true)
                setDialogHeader(email)
                setUserEmail(email)
            }}
                    severity="info"
                    size={"small"}
                    label={email}
            ></Button>
        </>
    }


    const banUser = (row) => {
        const banUserAccepted = () => {
            axiosInstance.post("/api/v1/users/ban/email/" + row.userEmail)
                .then((response) => {
                    toast.success("User Banned Successfully")
                    getData()
                })
        }

        return <>
            <ConfirmPopup target={buttonEl.current}
                          visible={visible}
                          onHide={() => setVisible(false)}
                          message="Are you sure you want to ban user?"
                          icon="pi pi-exclamation-triangle"
                          accept={banUserAccepted}
            />

            <Button ref={buttonEl}
                    onClick={() => setVisible(true)}
                    severity="info"
                    size={"small"}
                    label={"Ban"}
            ></Button>
        </>
    }

    return <Card>
        <DataTable title={"Reported Players"}
                   expandedRows={expandedRows}
                   onRowToggle={(e) => setExpandedRows(e.data)}
                   value={reportedPlayers}
                   size={"small"}
                   rowExpansionTemplate={expandedTable}
        >
            <Column expander={true}/>
            <Column header={"Email"} field={"userEmail"}
                    body={(rowData) => userCheckButton(rowData.userEmail)}/>
            <Column header={"Reportees"} body={reportTimes}/>
            <Column header={"Ban"} body={banUser}/>
        </DataTable>
        <Dialog header={"Reported User " + dialogHeader + " Information"}
                visible={userDialog}
                style={{width: '50vw'}}
                onHide={() => setUserDialog(false)}>
            <UserInfoWindow email={userEmail}/>
        </Dialog>
    </Card>
};

export default ReportedPlayersAdmin;