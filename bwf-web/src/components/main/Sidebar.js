import React, { useContext } from "react";
import classes from "./Sidebar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import LoginForm from "../forms/LoginForm";
import AccountControls from "./AccountControls";


export default function Sidebar(props) {
    const [authData] = useContext(AuthContext);

    return (
        <div className={classes.sidebar}>
            {authData == null ? (
                <LoginForm />
            ) : (
                <AccountControls/>
            )}
        </div>
    );
}
