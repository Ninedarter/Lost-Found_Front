import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Card} from "primereact/card";

const AllFoundItemsList = () => {

    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/v1/foundItem/all")
            .then((response) => {
                setFoundItems(response.data)
            })

    }, []);

    return (
        <Card title={"Found Items"}>
            <DataTable value={foundItems}>
                <Column field="title" header="Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="dateFound" header="Date"></Column>
            </DataTable>
        </Card>
    );
};

export default AllFoundItemsList;