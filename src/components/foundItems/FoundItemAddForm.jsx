import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { InputLabel } from '@mui/material'

import "./FoundItemAddForm.css";
import {Calendar} from "primereact/calendar";

import axiosInstance from "../../api/customAxios";
import {show} from "../../App";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";

import MapWithMarker from '../map/MapWithMarker';

const FoundItemAddForm = ({selected}) => { 
  const {setRefreshToken} = useAuth();
  const navigate = useNavigate();

const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [dateFound, setDateFound] = useState()
const [description, setDescription] = useState("")
const [latitude, setLatitude] = useState("")
const [longitude, setLongitude] = useState("")

const handleChange = (event) => {
  setCategory(event.target.value);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(title.length<4) {
      toast.warning("Title too short. Min 4")
      return
      }

      // if(!category) {
      //   toast.warning("Please select category")
      //   return
      // }

      if(!dateFound) {
        toast.warning("Please select date Found")
        return
      }     
}

  //   axiosInstance.post("/api/v1/foundItem/add", {
  //     "category": category,
  //       "title": title,
  //       "dateFound": dateFound,
  //       "description": description,
  //       "latitude": latitude,
  //       "longitude": longitude, 
  //       "email": "simona@gmail.com"
  // })
  //     .then((response) => {
       
  // })
  //     .catch(error => {
  //         toast.error("Something went wrong.");
  //         if (error.response) {
  //             console.error("Error status:", error.response.status);
  //             console.error("Error data:", error.response.data);
  //         } else if (error.request) {
  //             console.error("No response received:", error.request);
  //         } else {
  //             console.error("Error:", error.message);
  //         }
  //  });

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
                <InputText id="category"
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="category">Category</label>
            </span>

            <Calendar value={dateFound}
                          onChange={(e) => setDateFound(e.value)}
                          placeholder={"Date Found"}
                          style={{width: "100%"}}
                />
            
            <InputLabel
          style={{color: "black"}}>
            Where did you found item? Double click in a map: </InputLabel>
            <MapWithMarker/>
           

            <Button label="Submit"
            onClick={(e) => handleSubmit(e)}
            />
           
        </div>
        
        
        
    </Card>
    
) 
}



export default FoundItemAddForm