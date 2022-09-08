import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import classes from "./LoginForm.module.css";
import KeyIcon from "@mui/icons-material/Key";
import { authorizeUser, getUserFromLocalStorage, setLoggedInUser, setUserToLocalStorage } from "../../services/user-services";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";


function LoginForm(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [authData, setLoggedInUser] = useContext(AuthContext);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        authorizeUser({
            username: userName,
            password: password,
        }).then((data) => {
            if (!("token" in data)) {
                setErrors("Invalid credentials");
            } else {
                setLoggedInUser(data);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="userName">User Name</InputLabel>
            <Input
                id="userName"
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
                onChange={(event) => setUserName(event.target.value)}
                autoComplete="username"
            />

            <InputLabel htmlFor="password" className={`${classes.mt_2}`}>
                Password
            </InputLabel>
            <Input
                id="password"
                type="password"
                className={`${classes.mb_2}`}
                startAdornment={
                    <InputAdornment position="start">
                        <KeyIcon />
                    </InputAdornment>
                }
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
            />
            <div className={classes.button_spacing}>
                <Button color="primary" variant="contained" type="submit">
                    Login
                </Button>
                <Link to={"/register"}>
                    <Button color="primary" variant="contained">Register</Button>
                </Link>
            </div>
            {errors && <p>{errors}</p>}
        </form>
    );
}

export default LoginForm;
