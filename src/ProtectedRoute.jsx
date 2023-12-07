import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "./provider/authProvider";
import axiosInstance from "./api/customAxios";

export const ProtectedRoute = () => {
    const { token, setToken, setRefreshToken } = useAuth();
    const navigate =  useNavigate()

    if (!token) {
        return <Navigate to="/login" />;
    }

    axiosInstance.get("api/v1/users/amibanned")
        .then(res => {
            if(res.data) {
                setToken()
                setRefreshToken()
                navigate('/banned')
            }
        })

    return <Outlet />;
};