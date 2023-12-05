import React, {useEffect, useState} from 'react';
import axiosInstance from "../../api/customAxios";
import { Card } from 'react-bootstrap';
import styles from './AllLostItems.css'



const AllLostItems = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lostItems, setLostItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["title", "category", "dateLost", "description", "reward"]);

    useEffect(() => {
      axiosInstance.get("/api/v1/lostItem/all")
          .then((response) => {
              setIsLoaded(true);
              setLostItems(response.data)
          },(error) => {
            setIsLoaded(true);
            setError(error);
        }
      );
  }, []);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(q.toLowerCase()) > -1
          );
      });
  });
}

    if (error) {
      return <>{error.message}</>;
  } else if (!isLoaded) {
      return <>loading...</>;
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
                    </div>
                    <div className="getAllcontainer">


          {search(lostItems).map((item, index) => (  
<Card
key={index} >
    <div className="wrapper">
    <div className="product-img">
      <img src="https://clipground.com/images/lost-png-1.png"  width="327"/>
    </div>
    <div className="product-info">
      <div className="product-text">
        <h1>{item.title}</h1>
        <h2>Category: {item.category}</h2>
        <h2>Date Lost: {item.dateFound}</h2>
        <p>{item.description}</p></div>
      <div className="product-price-btn">
        <p><span>REWARD: {item.reward} €</span></p>
        <button type="button">Send message</button>
      </div>
    </div>
  </div>
  </Card>
          ))}
          </div>
          </div>
  );
};
}

export default AllLostItems