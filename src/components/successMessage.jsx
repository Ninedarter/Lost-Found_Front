import React, {useState} from 'react';
import axiosInstance from "../api/customAxios";

const SuccessMessage = () => {

    const [message, setMessage] = useState("")

    axiosInstance.get("/api/v1/demo-controller/")
        .then(response => {
            if(response.data) {
                setMessage(response.data)
            }
        })
        .catch(error => {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error:", error.message);
            }
        });
    return (
        <div>
            {message}
        </div>
    );
};

export default SuccessMessage;