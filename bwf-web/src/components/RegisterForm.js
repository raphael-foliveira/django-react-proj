import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import classes from "./RegisterForm.module.css";
import { registerNewUser } from "../services/user-services";

function RegisterForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");

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
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={4} marginLeft={4}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="firstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        className={classes.registerFormInput}
                        label="First Name"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="lastName"
                        onChange={(event) => setLastName(event.target.value)}
                        className={classes.registerFormInput}
                        label="Last Name"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="newUsername"
                        onChange={(event) => setNewUserName(event.target.value)}
                        className={classes.registerFormInput}
                        label="User Name"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="email"
                        label="e-mail"
                        color="primary"
                        onChange={(event) => setEmail(event.target.value)}
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        type="password"
                        id="newPassword"
                        onChange={(event) => setNewPassword(event.target.value)}
                        className={classes.registerFormInput}
                        label="Password"
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        type="password"
                        id="confirmPassword"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className={classes.registerFormInput}
                        label="password"
                        autoComplete="off"
                    />
                </Grid>
                { errors && 
                <Grid item xs={12}>
                    <p>{errors}</p>
                </Grid>
                }
                { message && 
                <Grid item xs={12}>
                    <p>{message}</p>
                </Grid>
                }
                <Grid item xs={12} justifyContent="center">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RegisterForm;
