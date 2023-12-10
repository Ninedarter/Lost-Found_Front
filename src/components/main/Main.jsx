import React from 'react';
import MainMap from '../map/MainMap';

const Main = () => {
    return (
        <div>
            <h1 style={{backgroundColor:"black", color:"white", margin:"0", height:"60px", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"25px", fontFamily:"Bentham"}}>Lost & Found Map - All Lost & Found items in one place!</h1>
            <MainMap/>
        </div>
        
    );
};

export default Main;