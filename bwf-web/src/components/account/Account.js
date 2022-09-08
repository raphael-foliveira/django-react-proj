import { Button, TextField } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { uploadAvatar, getUserProfile } from "../../services/user-services";
import { AuthContext } from "../../contexts/AuthContext";
import classes from './Account.module.css'

function Account(props) {
    const [image, setImage] = useState("");
    const [authData, setLoggedInUser] = useContext(AuthContext);
    const [imageDisplay, setImageDisplay] = useState();

    const uploadFile = async (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("image", image, image.name);
        const profileData = await uploadAvatar(authData.user.id, uploadData);
        window.location.reload();
    };  

    return (
        <div>
            <h1>Account</h1>
            <form onSubmit={uploadFile}>
                <label htmlFor="image">Upload your Avatar</label>
                <TextField type="file" onChange={(event) => setImage(event.target.files[0])} name="image" />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Upload image
                </Button>
            </form>
        </div>
    );
}

export default Account;
