import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "./provider/authProvider";
import { jwtDecode } from 'jwt-decode'
export const ProtectedAdminRoute = () => {
    const { token } = useAuth();
    const user = jwtDecode(token,{header:false})



    if (!token || user.roles.length===0 ) {
        return <Navigate to="/login" />;
    }

    if(!user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/main" />;
    }

    return <Outlet />;
};