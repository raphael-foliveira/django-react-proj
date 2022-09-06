import React, {useContext} from "react";
import { Routes, Route } from "react-router-dom";
import GroupList from "./GroupList";
import GroupDetails from "./GroupDetails";
import classes from "./Main.module.css";
import { AuthContext } from "../contexts/AuthContext";
import RegisterForm from "./RegisterForm";

function Main(props) {

    const [authData, setLoggedInUser] = useContext(AuthContext);

    return (
        <div className={classes.main}>
            <Routes>
                <Route path="/" element={<GroupList />} />
                <Route path="/details/:id" element={<GroupDetails />} />
                <Route path="/register" element={<RegisterForm/>} />
            </Routes>
        </div>
    );
};

export default Main;