import React, { useState} from 'react';
import Select from 'react-select';
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { InputLabel } from '@mui/material'

import "./FoundItemAddForm.css";
import {Calendar} from "primereact/calendar";
import {RadioButton} from "primereact/radiobutton";

import axiosInstance from "../../api/customAxios";
import {show} from "../../App";
import {toast} from "react-toastify";
import MapWithMarker from '../map/MapWithMarker';

const FoundItemAddForm = () => { 
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [dateFound, setDateFound] = useState()
const [description, setDescription] = useState("")
const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  

return (
    <Card title="Add Found item">
        <div className={"foundItemAdd-form-main"}>
        
            <span className="p-float-label">
                <InputText id="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           style={{width: "100%"}}
                />
                <label htmlFor="name">Title</label>
            </span>

            <span className="p-float-label">
                <InputText id="title"
                           value={title}
                           onChange={(e) => setDescription(e.target.value)}
                           style={{width: "100%", height: "100px"}}
                />
                <label htmlFor="name">Description</label>
            </span>


          <InputLabel
          style={{color: "white"}}>
            Select Category</InputLabel>
          <Select className="p-float-label"
            value={selected}
            onChange={handleChange}
          >
            {category}
          </Select>


            <Calendar value={dateFound}
                          onChange={(e) => setDateFound(e.value)}
                          placeholder={"Date Found"}
                />
            
            <InputLabel
          style={{color: "white"}}>
            Where did you found item? Double click in a map: </InputLabel>
            <MapWithMarker/>



            <Button label="Submit"
            />
        </div>
    </Card>
)
}


export default FoundItemAddForm