import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refresh_token"));

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const setRefreshToken = (newToken) => {
        setRefreshToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (refreshToken) {
            localStorage.setItem("refresh_token", refreshToken);
        } else {
            localStorage.removeItem("refresh_token");
        }
    }, [refreshToken]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            refreshToken,
            setRefreshToken
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;