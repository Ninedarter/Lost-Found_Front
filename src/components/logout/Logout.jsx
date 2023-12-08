import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";
import {useEffect} from "react";

const Logout = () => {
    const {setToken, setRefreshToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setToken()
        setRefreshToken()
        navigate("/", {replace: true});
    }, []);

    return <>Goodbye!</>;
};

export default Logout;