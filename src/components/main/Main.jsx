import React from 'react';
import MapContainer from "../map/MapContainer";
import AllFoundItems from '../foundItems/AllFoundItems';
import FoundItemAddForm from '../foundItems/FoundItemAddForm';

const Main = () => {
    return (
        <div>
            <FoundItemAddForm/>
            <AllFoundItems/>
        </div>
        
    );
};

export default Main;