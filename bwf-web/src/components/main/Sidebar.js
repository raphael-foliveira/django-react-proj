import React, { useContext } from "react";
import classes from "./Sidebar.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import LoginForm from '../forms/LoginForm';
import { Button } from "@mui/material";
import User from '../account/User';

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

                <User userName={authData.user.username}/>
                <Button color="primary" variant="contained" type="button" onClick={handleLogout} style={{padding: "auto"}}>
                    Logout
                </Button>
            </React.Fragment>
            }
        </div>
    );
    
}

export default Sidebar;
