import React, { useState, useContext } from "react";
import { Input, InputLabel, InputAdornment, Button, Grid } from "@mui/material";
import Key from "@mui/icons-material/Key";
import { AuthContext } from "../../contexts/AuthContext";
import { updateUserPassword } from "../../services/user-services";
import { useNavigate } from "react-router-dom";

function ChangePasswordForm(props) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [authData, setLoggedInUser] = useContext(AuthContext);
    const navigate = useNavigate();

    const updateNewPassword = (event) => {
        setNewPassword(event.target.value);
    };
    const updateConfirmNewPassword = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmitNewPassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setPasswordMatchError(true);
            return;
        }
        updateUserPassword(authData.user.id, newPassword).then((data) => console.log(data));
        navigate("/");
    };

    return (
        <div>
            <form onSubmit={handleSubmitNewPassword}>
                <Grid container rowGap={6} marginTop={6}>
                    <Grid item xs={12}>
                        <InputLabel>New Password</InputLabel>
                        <Input
                            type="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            }
                            onChange={updateNewPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Confirm Password</InputLabel>
                        <Input
                            type="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            }
                            onChange={updateConfirmNewPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                    {passwordMatchError && <p>Passwords do not match!</p>}
                </Grid>
            </form>
        </div>
    );
}

export default ChangePasswordForm;
