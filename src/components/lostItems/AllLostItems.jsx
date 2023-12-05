import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import {Card, Container} from "primereact/card";


const AllLostItems = () => {

    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/v1/lostItem/all")
            .then((response) => {
                setLostItems(response.data)
            })

    }, []);

  return (

    <div className="getAllcontainer">
          {lostItems.map((item, index) => (
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
        <h2>Date Lost: {item.dateFound}</h2>
        <p>{item.description}</p></div>
      <div class="product-price-btn">
        <p><span>REWARD: {item.reward} €</span></p>
        <button type="button">Send message</button>
      </div>
    </div>
  </div>
  </Card>
          ))};
          </div>
  );
};

export default AllLostItems