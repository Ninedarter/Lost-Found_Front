import React, {useEffect, useRef, useState} from 'react';
import axiosInstance from "../../../../api/customAxios";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import UserInfoWindow from "../../../user/InfoWindow/UserInfoWindow";
import {Button} from "primereact/button";
import {toast} from "react-toastify";
import {ConfirmPopup} from "primereact/confirmpopup";

const LostItemsAdmin = () => {
    const [lostItems, setLostItems] = useState([]);
    const buttonEl = useRef(null);
    const [visible, setVisible] = useState(false);
    const [userDialog, setUserDialog] = useState(false)

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axiosInstance.get("/api/v1/admin/lostItem/all")
            .then((response) => {
                setLostItems(response.data)
                console.log(response.data)
            })
    }

    const userCheckButton = (row) => {
        return <>
            <Dialog header={row.user.email + " Information"}
                    visible={userDialog} style={{width: '50vw'}}
                    onHide={() => setUserDialog(false)}>
                <UserInfoWindow userId={row.user.id}/>
            </Dialog>
            <Button onClick={() => setUserDialog(true)}
                    severity="info"
                    size={"small"}
            >{row.user.email}</Button>
        </>
    }

    const removeItem = (row) => {

        const acceptedToRemoveItem = () => {
            axiosInstance.delete("/api/v1/admin/lostItem/delete/" + row.id)
                .then((response) => {
                    toast.success("Item was removed successfully")
                    getData()
                })
        }

        return <>
            <ConfirmPopup target={buttonEl.current}
                          visible={visible}
                          onHide={() => setVisible(false)}
                          message="Are you sure you want to remove item?"
                          icon="pi pi-exclamation-triangle"
                          accept={acceptedToRemoveItem}
            />
            <Button ref={buttonEl}
                    onClick={() => setVisible(true)}
                    severity="danger"
                    icon="pi pi-trash"
                    size={"small"}
            />
        </>
    }

    return (
        <Card title={"Admin Lost Items"}>
            <DataTable value={lostItems}>
                <Column field="title" header="Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="dateFound" header="Date"></Column>
                <Column body={userCheckButton} field="user.email" header="User"></Column>
                <Column body={removeItem}></Column>
            </DataTable>
        </Card>
    );
};

export default LostItemsAdmin;