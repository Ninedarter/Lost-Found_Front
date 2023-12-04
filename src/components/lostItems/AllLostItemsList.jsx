import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Card} from "primereact/card";

const AllLostItemsList = () => {

    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/v1/lostItem/all")
            .then((response) => {
                setLostItems(response.data)
            })

    }, []);

    return (
        <Card title={"Lost Items"}>
            <DataTable value={lostItems}>
                <Column field="title" header="Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="dateFound" header="Date"></Column>
            </DataTable>
        </Card>
    );
};

export default AllLostItemsList;