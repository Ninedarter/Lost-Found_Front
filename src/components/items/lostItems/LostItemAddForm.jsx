import React, {useState, useEffect} from 'react';
import {InputText} from "primereact/inputtext";
import { Button } from 'primereact/button';
import {InputLabel} from '@mui/material'
import "./LostItemAddForm.css";
import {Calendar} from "primereact/calendar";
import axiosInstance from "../../../api/customAxios";
import {toast} from "react-toastify";
import MapWithMarker from '../../map/MapWithMarker';
import {InputTextarea} from "primereact/inputtextarea";

const LostItemAddForm = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [dateFound, setDateFound] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);

    const [restartValue, setRestartValue] = useState(1)

    const [submitted, setSubmitted] = useState(false)

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


    const handleSubmit = () => {
        setSubmitted(true)

        if(title.length<4) {
            toast.warning("Title too short. Min. 4")
            setSubmitted(false)
            return
        }

        if(title.length>50) {
            toast.warning("Title too long. Max. 4")
            setSubmitted(false)
            return
        }

        if(description.length<4) {
            toast.warning("Description too short. Min. 4")
            setSubmitted(false)
            return
        }

        if(category.length===0) {
            toast.warning("You have not picked category")
            setSubmitted(false)
            return
        }

        if(dateFound.length===0) {
            toast.warning("You have not picked lost date")
            setSubmitted(false)
            return
        }

        if(latitude === 0.0 && longitude === 0.0) {
            toast.warning("You have not picked location")
            setSubmitted(false)
            return
        }

        axiosInstance.post('/api/v1/lostItem/add-new', {
            title: title,
            category: category,
            dateLost: dateFound.toISOString().substring(0, 10),
            description: description,
            coordinates: {
                longitude: longitude,
                latitude:latitude,
            },
            reward: reward
        })
            .then((response) => {
                toast.success("Item added successfully")
                setTitle('');
                setCategory('');
                setDateFound('');
                setDescription('');
                setLongitude(0.0);
                setLatitude(0.0);
                setReward('');
                setSubmitted(false)
                setRestartValue(val=> val+1)
            })
            .catch(er => {
                toast.error(er.message)
                setSubmitted(false)
            })
    };

    return (
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
                  <select className='select-category' onChange={upadateSelectCategory} value={category} style={{width: "100%"}}>
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
                restart={restartValue}
            ></MapWithMarker>
            
                <span className="p-float-label">
                        <InputText id="reward"
                                value={reward}
                                onChange={(e) => setReward(e.target.value)}
                                style={{width: "100%"}}
                        />
                        <label htmlFor="reward">Reward</label>
                    </span>

                <Button label="Submit"
                        onClick={(e) => handleSubmit(e)}
                        disabled={submitted}
                />
            </div>
        
    )

}


export default LostItemAddForm