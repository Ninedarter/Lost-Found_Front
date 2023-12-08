import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "./provider/authProvider";
import axiosInstance from "./api/customAxios";
import {useState} from "react";

export const ProtectedRoute = () => {
    const [checkedIfBanned, setCheckedIfBanned] = useState(false)
    const { token, setToken, setRefreshToken } = useAuth();
    const navigate =  useNavigate()

    const checkIfBanned = () => {
        if(!checkedIfBanned) {
            axiosInstance.get("api/v1/users/amibanned")
                .then(res => {
                    if(res.data) {
                        setToken()
                        setRefreshToken()
                        navigate('/banned')
                    } else  {
                        setCheckedIfBanned(true)
                    }
                })
        }
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    checkIfBanned()


    return <Outlet />;
};