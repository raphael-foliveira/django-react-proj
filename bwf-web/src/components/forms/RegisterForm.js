import React, { useState } from "react";
import {useNavigate}  from 'react-router-dom';
import { Button, TextField, Grid } from "@mui/material";
import classes from "./RegisterForm.module.css";
import { registerNewUser } from "../../services/user-services";

function RegisterForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrors("Passwords do not match!");
            return;
        }
        if (!email.includes("@")) {
            setErrors("Please enter a valid e-mail!");
            return;
        }
        setErrors("");
        const newUserData = {
            firstName,
            lastName,
            newUserName,
            newPassword,
            email,
        };
        registerNewUser(newUserData).then((data) => setMessage(data.message));
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <h1>Register</h1>
                </Grid>
                <Grid item>
                    <TextField
                        id="firstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        className={classes.registerFormInput}
                        label="First Name"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="lastName"
                        onChange={(event) => setLastName(event.target.value)}
                        className={classes.registerFormInput}
                        label="Last Name"
                        color="primary"
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="newUsername"
                        onChange={(event) => setNewUserName(event.target.value)}
                        className={classes.registerFormInput}
                        label="User Name"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="email"
                        label="e-mail"
                        color="primary"
                        onChange={(event) => setEmail(event.target.value)}
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        type="password"
                        id="newPassword"
                        onChange={(event) => setNewPassword(event.target.value)}
                        className={classes.registerFormInput}
                        label="Password"
                        autoComplete="off"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="password"
                        id="confirmPassword"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className={classes.registerFormInput}
                        label="password"
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12}>
                    {errors && <p>{errors}</p>}
                    {message && <p>{message}</p>}
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RegisterForm;
