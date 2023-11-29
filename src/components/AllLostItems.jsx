import React, { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import styles from '../components/AllLostItems.css'
import MapContainer from './MapContainer'

const AllLostItems = () => {
    // const [lostItemsData, setLostItemsData] = useState([]);
  
    // const getdata = () => {
    //   lostItemService.getAllLostItemsData().then((response) => {
    //     console.log(response);
    //     setLostItemsData(response.data);
    //   })
    // }
  
    // useEffect(() => {
    //   getdata()
    // }, [])
  
    // console.log(lostItemsData)
  
    return (
        <div className='lostItemsBody'>
            <h1>Lost Items</h1>
      <div className="lostItemsCard">
        <Container 
        className="lostItemContainer" 
        // getdata={getdata}
        >
          {/* {lostItemsData.map((item, index) => ( */}
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
                    {/* {item.type} */}
                    </Card.Text>
                <Card.Text>Date lost: 
                    {/* {item.dateLost} */}
                    </Card.Text>
                <Card.Header>Reward: 
                    {/* {item.reward} */}
                    </Card.Header>
              </Card.Body>
            </Card>
          {/* ))} */}
          <div className='callButtons'>
          <button className="callbtn" type="submit">
              Call Loser
            </button>
            <button className="callbtn" type="submit">
              Message Loser
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

export default AllLostItems
