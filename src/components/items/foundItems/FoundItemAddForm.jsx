import React, {useState, useEffect} from 'react';
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {InputLabel} from '@mui/material'

import {Calendar} from "primereact/calendar";
import axiosInstance from "../../../api/customAxios";
import {toast} from "react-toastify";
import MapWithMarker from '../../map/MapWithMarker';
import {InputTextarea} from "primereact/inputtextarea";
import "./FoundItemAddForm.css";
import {useAuth} from "../../../provider/authProvider";
const FoundItemAddForm = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [dateFound, setDateFound] = useState('');
    const [description, setDescription] = useState('');
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);

    const getCategories = () => {
        axiosInstance.get("/api/v1/categories/all")
            .then((response) => {
                setCategories(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        getCategories()
    }, []);


    const upadateSelectCategory = e => {
        setCategory(e.target.value);
    };

    const onSubmit = () => {
        axiosInstance.post('/api/v1/foundItem/add-easier', {
            title: title,
            category: category,
            dateFound: dateFound.toISOString().substring(0, 10),
            description: description,
            coordinates: {
                longitude: longitude,
                latitude:latitude,
            },
            imageUrl: "test"
        })
            .then((response) => {
                toast.success("Item added")
                setTitle('');
                setCategory('');
                setDateFound('');
                setDescription('');
                setLongitude(0.0);
                setLatitude(0.0);
            });


    };


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
                    <InputTextarea id="description"
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                </span>

                <span>
                  <select onChange={upadateSelectCategory} value={category} style={{width: "100%"}}>
                      <option value="">-- Category --</option>
                      {categories.map((item, index) => (
                          <option key={item}>{item}</option>))}
                  </select>
                </span>

                <span className="p-float-label">
                   <Calendar value={dateFound}
                             id={"calendar"}
                             onChange={(e) => setDateFound(e.value)}
                             placeholder={"Date Found"}
                             style={{width: "100%"}}

                   />
                    <label htmlFor="calendar">Date</label>
                </span>

                <InputLabel
                    style={{color: "black"}}>
                    Where did you found item? (Double click)
                </InputLabel>

                <MapWithMarker
                    coordinates={(coordinates) => {
                        setLatitude(coordinates.lat)
                        setLongitude(coordinates.lng)
                    }}
                ></MapWithMarker>

                <Button label="Submit"
                        onClick={() => onSubmit()}
                />
            </div>
        </Card>
    )

}


export default FoundItemAddForm