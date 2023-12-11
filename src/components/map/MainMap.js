import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axiosInstance from "../../api/customAxios";
import { Card } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import UserInfoWindow from "../user/InfoWindow/UserInfoWindow";

const MainMap = () =>  {
    const [selectedLost, setSelectedLost ] = useState(null);
    const [selectedFound, setSelectedFound ] = useState(null);
    const [selectedFoundMoreInfo, setSelectedFoundMoreInfo ] = useState(null);
    const [selectedLostMoreInfo, setSelectedLostMoreInfo ] = useState(null);
    const [foundItems, setFoundItems] = useState([]);
    const [lostItems, setLostItems] = useState([]);
   
    useEffect(() => {
        axiosInstance.get("/api/v1/foundItem/all")
            .then((response) => {
                setFoundItems(response.data)
                console.log(response.data)
            }
        );
    }, []);

    useEffect(() => {
        axiosInstance.get("/api/v1/lostItem/all")
            .then((response) => {
                setLostItems(response.data)
                console.log(response.data)
            }
        );
    }, []);

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 55.3851, lng: 23.1734
    };
  
    const onSelectLost = item => {
        setSelectedLost(item);
        setSelectedFound(null)

    };

    const onSelectFound = item => {
        setSelectedFound(item);
        setSelectedLost(null);
    };

    const onSelectFoundMoreInfo = selectedFound => {
        setSelectedFoundMoreInfo(selectedFound);
    }

    const onSelectLostMoreInfo = selectedLost => {
        setSelectedLostMoreInfo(selectedLost);
    }
    

    return (
        <LoadScript googleMapsApiKey='AIzaSyB2tAu2LgRqzArvz3qJ-kup_XEI4aZXvug'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={8}
                center={defaultCenter}>

                {        
                    foundItems.map(item => {
                        return (
                            <Marker 
                                key={item.coordinates.id} 
                                position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude}}
                                icon={'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png'}
                                onClick={() => onSelectFound(item)}
                            />
                        )
                    })
                }

                {          
                    selectedFound && (
                        <InfoWindow        
                            position={{lat: selectedFound.coordinates.latitude, lng: selectedFound.coordinates.longitude}}
                            clickable={true}
                            onCloseClick={() => {setSelectedLost(null); setSelectedFound(null); setSelectedFoundMoreInfo(null)}}
                        >
                            <div>
                                <Card>
                                    <div className="wrapper">
                                        <div className="product-img">
                                            <img src="https://cdn3.iconfinder.com/data/icons/search-36/512/283_Find_Search_View-256.png" width="327"/>
                                        </div>
                                        <div className="product-info">
                                            <div className="product-text">
                                                <h1>{selectedFound.title}</h1>
                                                <h2>Category: {selectedFound.category}</h2>
                                                <h2>Date Found: {selectedFound.dateFound}</h2>
                                                <p>{selectedFound.description}</p>
                                            </div>
                                            
                                            
                                            <div className="product-price-btn">
                                                <p><span></span></p>
                                                <button onClick={() => {onSelectFoundMoreInfo(selectedFound)}}>More info</button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </InfoWindow>
                    )
                }
                {          
                    selectedFoundMoreInfo && (
                        <Dialog
                            visible={true}
                            onHide= { () => setSelectedFoundMoreInfo(false)}
                            header={"Founder Info"}
                        >
                            <UserInfoWindow userId={selectedFound.user.id} />
                        </Dialog>
                        )
                } 



                {        
                    lostItems.map(item => {
                        return (
                            <Marker 
                                key={item.coordinates.id} 
                                position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude}}
                                icon={'http://maps.google.com/mapfiles/kml/paddle/red-circle.png'}
                                onClick={() => onSelectLost(item)}
                            />
                        )
                    })
                }

                {          
                    selectedLost && (
                        <InfoWindow        
                            position={{lat: selectedLost.coordinates.latitude, lng: selectedLost.coordinates.longitude}}
                            clickable={true}
                            onCloseClick={() => {setSelectedLost(null); setSelectedFound(null); setSelectedLostMoreInfo(null) }} 
                        >
                            <div>
                                <Card>
                                    <div className="wrapper">
                                        <div className="product-img">
                                            <img src="https://clipground.com/images/lost-png-1.png" width="327"/>
                                        </div>
                                        <div className="product-info">
                                            <div className="product-text">
                                                <h1>{selectedLost.title}</h1>
                                                <h2>Category: {selectedLost.category}</h2>
                                                <h2>Date Lost: {selectedLost.dateLost}</h2>
                                                <p>{selectedLost.description}</p>
                                            </div>
                                                <div className="product-price-btn">
                                                <p><span></span></p>
                                                <button onClick={() => {onSelectLostMoreInfo(selectedLost)}}>More info</button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </InfoWindow>
                    )
                }
                {          
                    selectedLostMoreInfo && (
                        <Dialog
                            visible={true}
                            onHide= { () => setSelectedLostMoreInfo(false)}
                            header={"Lost Item Owner Info"}
                        >
                            <UserInfoWindow userId={selectedLost.user.id} />
                        </Dialog>
                        )
                } 
            </GoogleMap>
        </LoadScript>  
    );
}

export default MainMap;
