import React, { useContext, useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import {AuthContext} from "../contexts/AuthContext";
import LoginForm from './LoginForm';
import { Button } from "@mui/material";

function Sidebar(props) {

    const [authData, setLoggedInUser] = useContext(AuthContext);

    const handleLogout = () => {
        setLoggedInUser(null);
    }

    return (
        <div className={classes.sidebar}>
            { authData == null ? 
            <LoginForm/> 
            :
            <React.Fragment>
                <p>Welcome {authData.user.username}</p>
                <Button color="primary" variant="contained" type="button" onClick={handleLogout}>
                    Logout
                </Button>
            </React.Fragment>
            }
        </div>
    );
    
}

export default Sidebar;
