import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/main/Sidebar";
import Main from "./components/main/Main";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import {setUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage} from './services/user-services';

function App() {
    const userData = getUserFromLocalStorage();
    const [authData, setAuthData] = useState(userData);

    const setLoggedInUser = (userData) => {
        if (userData) {
            setUserToLocalStorage(userData);
        } else {
            removeUserFromLocalStorage();
        }
        setAuthData(userData);
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={[authData, setLoggedInUser]}>
                <div className="App">
                    <BrowserRouter>
                        <Header />
                        <div className="general-content">
                            <Sidebar />
                            <Main />
                        </div>
                    </BrowserRouter>
                </div>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
