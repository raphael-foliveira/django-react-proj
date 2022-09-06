import React, { useState, useEffect } from "react";
import { Input, Button, InputLabel, InputAdornment, TextField, Grid } from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import classes from "./RegisterForm.module.css";
import { registerNewUser } from "../services/user-services";
import styled from "styled-components";

const Centralized = styled.div`
    display: flex;
    justify-content: center;
`;

const GridMarginTop = styled(Grid)`
    margin-top: 20px;
`;

function RegisterForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword != confirmPassword) {
            setErrors("Passwords do not match!");
            return;
        }
        const newUserData = {
            firstName,
            lastName,
            newUserName,
            newPassword,
            email
        };
        registerNewUser(newUserData).then((data) => console.log(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <GridMarginTop container spacing={0}>
                
                <Grid xs={12} md={6}>
                    <TextField
                        id="firstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        className={classes.registerFormInput}
                        label="First Name"
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <TextField
                        id="lastName"
                        onChange={(event) => setLastName(event.target.value)}
                        className={classes.registerFormInput}
                        label="Last Name"
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <InputLabel htmlFor="newUsername">Username</InputLabel>
                    <Input
                        id="newUsername"
                        onChange={(event) => setNewUserName(event.target.value)}
                        startAdornment={
                            <InputAdornment>
                                <AccountCircle />
                            </InputAdornment>
                        }
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <TextField
                        id="email"
                        label="e-mail"
                        color="primary"
                        onChange={(event) => setEmail(event.target.value)}
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <InputLabel htmlFor="newPassword">Password</InputLabel>
                    <Input
                        type="password"
                        id="newPassword"
                        onChange={(event) => setNewPassword(event.target.value)}
                        startAdornment={
                            <InputAdornment>
                                <Key />
                            </InputAdornment>
                        }
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input
                        type="password"
                        id="confirmPassword"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        startAdornment={
                            <InputAdornment>
                                <Key />
                            </InputAdornment>
                        }
                        className={classes.registerFormInput}
                    />
                </Grid>

                <Grid xs={12}>
                    <p>{errors}</p>
                </Grid>

                <Grid xs={12}>
                    <Centralized>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Centralized>
                </Grid>

            </GridMarginTop>
        </form>
    );
}

export default RegisterForm;
