import React, {useEffect, useRef, useState} from 'react';
import axiosInstance from "../../../api/customAxios";
import {Card} from 'react-bootstrap';
import './FoundItemsCard.css';
import {Dialog} from "primereact/dialog";
import {Button} from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const FoundItemsCard = () => {
    const [selectedFound, setSelectedFound ] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [foundItems, setFoundItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["title", "category", "dateFound", "description"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const getData = () => {
        axiosInstance.get("/api/v1/foundItem/all")
            .then((response) => {
                    setIsLoaded(true);
                    setFoundItems(response.data)
                    console.log(response.data)
                    
                });
            }
    
    useEffect(() => {
        getData()
    }, []);

    const onSelectFound = item => {
        setSelectedFound(item);
    };

    function search(items) {
        return items.filter((item) => {
            if (item.category == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center", overflow: "hidden"}}>
                    <ProgressSpinner style={{overflow:"hidden"}} />
                </div>;
    } else {
        return (
            <div>
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />

                    </label>
                    <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Items By Categories"
                        >
                            <option value="All">Filter By Category</option>
                            <option value="CLOTHES">CLOTHES</option>
                            <option value="WALLET">WALLET</option>
                            <option value="PHONE">PHONE</option>
                            <option value="JEWELRY">JEWELRY</option>
                            <option value="GLASSES">GLASSES</option>
                            <option value="KEYS">KEYS</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>

                <div className="getAllcontainerFoundItems">

                    {search(foundItems).map((item, index) => (
                        <Card
                            key={index}>
                            <div className="wrapper">
                                <div className="product-img">
                                    <img
                                        src="https://cdn3.iconfinder.com/data/icons/search-36/512/283_Find_Search_View-256.png"
                                        width="327" alt={"photo"}/>
                                </div>
                                <div className="product-info"  style={{overflow:"hidden"}}>
                                    <div className="product-text">
                                        <h1>{item.title}</h1>
                                        <h2>Category: {item.category}</h2>
                                        <h2>Date Found: {item.dateFound}</h2>
                                        <p>{item.description}</p></div>
                                    <div className="product-price-btn">
                                    <Button onClick={() => {onSelectFound(item)}}>More info</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                    }
                    
                    {          
                        selectedFound && (
                        <Dialog
                            visible={true}
                            onHide= { () => setSelectedFound (false)}>
                            <div>
                                <Card>
                                    <div className="contact-info">
                                            <h1>Contact Info</h1>
                                            <h2>Email: {selectedFound.user.email}</h2>
                                            <h2>Phone: {selectedFound.user.phoneNumber}</h2>
                                    </div>
                                </Card>
                            </div>
                        </Dialog>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default FoundItemsCard