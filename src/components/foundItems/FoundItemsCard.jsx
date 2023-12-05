import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Card, Container} from "primereact/card";
import styles from './FoundItemsCard.css'
import FilteredList from '../FilteredList';



const FoundItemsCard = () => {

    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/v1/foundItem/all")
            .then((response) => {
                setFoundItems(response.data)
            })

    }, []);

  return (

    <div className="getAllcontainer">
          {foundItems.map((item, index) => (
<Card
key={index} >
    <div className="wrapper">
    <div className="product-img">
      <img src="http://bit.ly/2tMBBTd" height="420" width="327"/>
    </div>
    <div className="product-info">
      <div className="product-text">
        <h1>{item.title}</h1>
        <h2>Category: {item.category}</h2>
        <h2>Date Found: {item.dateFound}</h2>
        <p>{item.description}</p></div>
      <div class="product-price-btn">
        <p><span>Yours?</span></p>
        <button type="button">Send message</button>
      </div>
    </div>
  </div>
  </Card>
          ))};
          </div>
  );
};

export default FoundItemsCard