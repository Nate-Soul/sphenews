import { createContext, useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:5000/api";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem("user")) ||  null);

    const login = async (inputs) => {
        const res = await axios.post(`${url}/auth/login`, inputs);
        setcurrentUser(res.data);
    }

    const logout = async () => {
        await axios.post(`${url}/auth/logout`);
        setcurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            { children }
        </AuthContext.Provider>
    )

}