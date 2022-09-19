import React, { useState, useEffect } from "react";
import { getUserAccountInfo } from "../../services/user-services";
import { Avatar } from "@mui/material";

export default function Member(props) {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserAccountInfo(props.userId, props.token).then((userData) => {
            setUser(userData);
        });
    }, []);

    return (
        <React.Fragment>
            {user && (
                <React.Fragment>
                    <Avatar src={user.profile.image} />
                    <p>{user.username}</p>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
