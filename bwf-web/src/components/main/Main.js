import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import GroupList from "../group/GroupList";
import GroupDetails from "../group/GroupDetails";
import classes from "./Main.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import RegisterForm from "../forms/RegisterForm";
import Account from "../account/Account";
import ChangePasswordForm from "../forms/ChangePasswordForm";

function Main(props) {
    const [authData, setLoggedInUser] = useContext(AuthContext);

    return (
        <div className={classes.main}>
            <Routes>
                <Route path="/" element={<GroupList />} />
                <Route path="/details/:id" element={<GroupDetails />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/account" element={<Account />} />
                <Route path="/change-password" element={<ChangePasswordForm />} />
            </Routes>
        </div>
    );
}

export default Main;
