import React, {useEffect, useRef, useState} from 'react';
import axiosInstance from "../../../../api/customAxios";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {ConfirmPopup} from "primereact/confirmpopup";
import {toast} from "react-toastify";
import {Dialog} from "primereact/dialog";
import UserInfoWindow from "../../../user/UserInfoWindow";

const FoundItemsAdmin = () => {
    const [foundItems, setFoundItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [userDialog, setUserDialog] = useState(false)
    const buttonEl = useRef(null);


    const getData = () => {
        axiosInstance.get("/api/v1/admin/foundItem/all")
            .then((response) => {
                setFoundItems(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        getData()
    }, []);

    const userCheckButton = (row) => {
        return <>
            <Dialog header={row.user.email + " Information"} visible={userDialog} style={{ width: '50vw' }} onHide={() => setUserDialog(false)}>
               <UserInfoWindow userId={row.user.id} />
            </Dialog>
            <Button onClick={() => setUserDialog(true)}
                    severity="info"
                    size={"small"}
            >{row.user.email}</Button>
        </>
    }

    const removeItem = (row) => {
        const acceptedToRemoveItem = () => {
            axiosInstance.delete("/api/v1/admin/foundItem/delete/" + row.id)
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

    return <Card title={"Admin Found Items"}>
        <DataTable value={foundItems} size={"small"}>
            <Column field="title" header="Title"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="dateFound" header="Date"></Column>
            <Column body={userCheckButton} field="user.email" header="User"></Column>
            <Column body={removeItem}></Column>
        </DataTable>
    </Card>
};

export default FoundItemsAdmin;