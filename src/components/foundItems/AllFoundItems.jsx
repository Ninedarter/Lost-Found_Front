import React, { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import styles from './AllFoundItems.css'
import MapContainer from '../map/MapContainer'
import axiosInstance from "../../api/customAxios";

const AllFoundItems = () => {

  const [foundItemsData, setFoundItemsData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/v1/foundItem/getAll")
    .then((response) => {
       setFoundItemsData(response.data)
    })

  }, [setFoundItemsData]);
  
    return (

<div className="FoundItemgetAll">
      <h2>All Found Items</h2>
      <Container className="getAllcontainer">
          {foundItemsData.map((item, index) => (
            <div className='foundItemsCard'>
            <Card 
            key={index} 
            style={{ width: '18rem' }}  
            >
              <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.cWDmxfCwrk4WTmNqihtrggHaDN?rs=1&pid=ImgDetMain" />
              <div className='foundItemsBody'>
              <Card.Body>
                <Card.Title>Title:
                    {item.title}
                    </Card.Title>
                <Card.Text>Description:  
                    {item.description}
                    </Card.Text>
                <Card.Text>Date found: 
                    {item.dateFound}
                    </Card.Text>
              </Card.Body>
              </div>
                  
          <div className='callButtons'>
          <button className="callbtn" type="submit">
              Call Finder
            </button>
            <button className="callbtn" type="submit">
              Message Finder
            </button>
            </div>
            
            <div className='mapcontainer'>
        <MapContainer/>
        </div>

        </Card>
        </div>
    ))}
    </Container>
        
        
      </div>
    )

}

export default AllFoundItems
  