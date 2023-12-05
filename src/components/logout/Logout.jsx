import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";
import {useEffect} from "react";

const Logout = () => {
    const {setToken, setRefreshToken} = useAuth();
    const navigate = useNavigate();

    setToken()
    setRefreshToken()

    useEffect(() => {
        navigate("/", {replace: true});
    }, []);

    return <>Goodbye!</>;
};

export default Logout;