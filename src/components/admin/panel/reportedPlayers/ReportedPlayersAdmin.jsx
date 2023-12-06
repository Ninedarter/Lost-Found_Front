import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Card} from "primereact/card";

const ReportedPlayersAdmin = () => {
    const [reportedPlayers, setReportedPlayers] = useState([])

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {

    }

    return <Card>
        <DataTable title={"Reported Players"}>

        </DataTable>
    </Card>
};

export default ReportedPlayersAdmin;