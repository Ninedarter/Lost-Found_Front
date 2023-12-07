import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { InputLabel } from '@mui/material'
import "./FoundItemAddForm.css";
import {Calendar} from "primereact/calendar";
import axiosInstance from "../../api/customAxios";
import {toast} from "react-toastify";
import MapWithMarker from '../map/MapWithMarker';

const FoundItemAddForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [dateFound, setDateFound] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [foundItem, setFoundItem] = useState([]);

  const handleSubmit = (e) => {
     e.preventDefault();
     addPosts(title, category, dateFound, description, latitude, longitude);
  };

    const getData = () => {
    axiosInstance.get("/api/v1/categories/all")
        .then((response) => {
            setCategories(response.data)
            console.log(response.data)
        })
}

useEffect(() => {
    getData()
}, []);


  const upadateSelectCategory = e => {         
    setCategory(e.target.value);
  };


  const addPosts = (title, category, dateFound, description, latitude, longitude) => {
    axiosInstance.post('/api/v1/foundItem/add', {
           title: title,
           category: category,
           dateFound: dateFound.toISOString().substring(0,10),
           description: description,
           latitude: latitude,
           longitude: longitude,
        })
        .then((response) => {
           setFoundItem([response.data, ...foundItem]);
        });
          setTitle('');
          setCategory('');
          setDateFound('');
          setDescription('');
          setLatitude('');
          setLongitude('');
        };


console.log(title, category, description, dateFound, longitude, latitude);


return (
    <Card className="addingcard"> 
        <div className={"foundItemAdd-form-main"}>
        
            <span className="p-float-label">
                <InputText id="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="title">Title</label>
            </span>

            <span className="p-float-label">
                <InputText id="title"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           style={{width: "100%", height: "100px"}}
                />
                <label htmlFor="description">Description</label>
            </span>

            <span className="p-float-label">
              <select onChange={upadateSelectCategory} value={category} style={{width: "100%"}}>
              <option value="">-- Category --</option>
              {categories.map((item, index) => (
              <option key={item}>{item}</option>))}  
              </select>
            </span>

            <span className="p-float-label">
                <InputText id="category"
                           value={latitude}
                           onChange={(e) => setLatitude(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="category">Latitude</label>
            </span>

            <span className="p-float-label">
                <InputText id="category"
                           value={longitude}
                           onChange={(e) => setLongitude(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="category">Longitude</label>
            </span>

            <Calendar value={dateFound}
                          onChange={(e) => setDateFound(e.value)}
                          placeholder={"Date Found"}
                          style={{width: "100%"}}
                          
                />
            
            <InputLabel
          style={{color: "black"}}>
            Where did you found item? Double click in a map: </InputLabel>

           

            <Button label="Submit"
            onClick={(e) => handleSubmit(e)}
            
            /> 
           
        </div>
        
    </Card>
  
) 

}


export default FoundItemAddForm