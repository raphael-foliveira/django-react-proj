import React, { useContext } from "react";
import classes from "./Sidebar.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import LoginForm from '../forms/LoginForm';
import { Button } from "@mui/material";
import User from '../account/User';
import { useNavigate } from "react-router-dom";

function Sidebar(props) {

    const [authData, setLoggedInUser] = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
    }

    const goToMyAccountPage = () => {
        navigate("/account")
    }

    return (
        <div className={classes.sidebar}>
            { authData == null ? 
            <LoginForm/> 
            :
            <React.Fragment>

                <User userName={authData.user.username}/>
                <Button color="primary" variant="contained" type="button" onClick={goToMyAccountPage} style={{padding: "auto"}}>
                    My Account
                </Button>
                <Button color="primary" variant="contained" type="button" onClick={handleLogout} style={{padding: "auto"}}>
                    Logout
                </Button>
            </React.Fragment>
            }
        </div>
    );
    
}

export default Sidebar;
