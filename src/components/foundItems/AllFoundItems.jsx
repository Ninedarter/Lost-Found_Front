import React, { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import styles from './AllFoundItems.css'
import MapContainer from '../map/MapContainer'

const AllFoundItems = () => {
    // const [foundItemsData, setFoundItemsData] = useState([]);
  
    // const getdata = () => {
    //   foundItemService.getAllFoundItemsData().then((response) => {
    //     console.log(response);
    //     setFoundItemsData(response.data);
    //   })
    // }
  
    // useEffect(() => {
    //   getdata()
    // }, [])
  
    // console.log(foundItemsData)
  
    return (
        <div className='foundItemsBody'>
            <h1>Found Items</h1>
      <div className="foundItemsCard">
        <Container 
        className="foundItemContainer" 
        // getdata={getdata}
        >
          {/* {foundItemsData.map((item, index) => ( */}
            <Card 
            // key={index} 
            style={{ width: '18rem' }}
            >
              <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.cWDmxfCwrk4WTmNqihtrggHaDN?rs=1&pid=ImgDetMain" />
              <Card.Body>
                <Card.Title>Title:
                    {/* {item.title} */}
                    </Card.Title>
                <Card.Text>Description: 
                    {/* {item.description} */}
                    </Card.Text>
                <Card.Text>Type: 
                    {/* {item.description} */}
                    </Card.Text>
                <Card.Text>Date found: 
                    {/* {item.description} */}
                    </Card.Text>
              </Card.Body>
            </Card>
          {/* ))} */}
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
        </Container>
        
        
      </div>
      </div>
    )

}

export default AllFoundItems
