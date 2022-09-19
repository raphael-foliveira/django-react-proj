import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import GroupList from "../group/GroupList";
import GroupDetails from "../group/GroupDetails";
import classes from "./Main.module.css";
import RegisterForm from "../forms/RegisterForm";
import Account from "../account/Account";
import { AuthContext } from "../../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function Main(props) {
    const [authData] = useContext(AuthContext);

    useEffect(() => {}, []);

    return (
        <div className={classes.main}>
            <Routes>
                <Route path="/" element={<GroupList />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                    path="/details/:id"
                    element={
                        <ProtectedRoute authData={authData}>
                            <GroupDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute authData={authData}>
                            <Account />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}
