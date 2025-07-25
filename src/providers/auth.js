import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('Token') || null)

    const login = (token) => {
        setToken(token)
        localStorage.setItem('Token', token)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}