import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../../api/customAxios";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const LostItemsAdmin = () => {
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/v1/admin/lostItem/all")
            .then((response) => {
                setFoundItems(response.data)
                console.log(response.data)
            })

    }, []);

    return (
        <Card title={"Admin Found Items"}>
            <DataTable value={foundItems}>
                <Column field="title" header="Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="dateFound" header="Date"></Column>
            </DataTable>
        </Card>
    );
};

export default LostItemsAdmin;