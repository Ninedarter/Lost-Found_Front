import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";

const Logout = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();

    setToken();
    navigate("/", {replace: true});

    return <>Goodbye!</>;
};

export default Logout;