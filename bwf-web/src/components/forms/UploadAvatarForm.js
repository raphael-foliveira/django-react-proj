import { Button, TextField, Grid } from "@mui/material";
import React, { useState, useContext } from "react";
import { uploadAvatar } from "../../services/user-services";
import { AuthContext } from "../../contexts/AuthContext";
import {NotificationManager} from "react-notifications";

export default function UploadAvatarForm(props) {
    const [image, setImage] = useState("");
    const [authData] = useContext(AuthContext);

    const uploadFile = async (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("image", image, image.name);
        const profileData = await uploadAvatar(authData.user.id, uploadData, authData.token);
        console.log(profileData);
        if (typeof(profileData) !== "undefined") {
            NotificationManager.success("Avatar image uploaded successfully!");
            window.location.reload();
        } else {
            NotificationManager.warning("There was an error while uploading the image.");
        }
        
    };

    return (
        <form onSubmit={uploadFile}>
            <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                    <label htmlFor="image">Upload your Avatar</label>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="file" onChange={(event) => setImage(event.target.files[0])} name="image" />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Upload image
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}


