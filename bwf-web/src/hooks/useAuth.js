import { useContext, createContext, useState } from "react"

const AuthContext = createContext(null);


export const AuthProvider = ({user, children}) => {

    const [authData, setAuthData] = useState(user);

    return (
        <AuthContext.Provider value={{authData, setAuthData}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};