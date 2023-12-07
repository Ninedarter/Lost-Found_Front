import React from 'react';
import {TabPanel, TabView} from "primereact/tabview";
import FoundItemAddForm from "./foundItems/FoundItemAddForm";
import LostItemAddForm from "./lostItems/LostItemAddForm";
import {Card} from "primereact/card";

import './ItemTypeSelectWindow.css'

const ItemTypeSelectWindow = () => {
    return (
        <Card>
            <TabView>
                <TabPanel header="Add Found Item">
                    <FoundItemAddForm />
                </TabPanel>
                <TabPanel header="Add Lost Item">
                    <LostItemAddForm />
                </TabPanel>
            </TabView>
        </Card>

    );
};

export default ItemTypeSelectWindow;