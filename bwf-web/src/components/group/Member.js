import React, { useState, useEffect } from "react";
import { getUserAccountInfo } from "../../services/user-services";
import { Avatar } from "@mui/material";

export default function Member(props) {
    const [member, setMember] = useState();

    useEffect(() => {
        getUserAccountInfo(props.userId, props.token).then((userData) => {
            setMember(userData);
        });
    }, []);

    return (
        <>
            {member && (
                <>
                    <Avatar src={member.profile?.image} />
                    <p>{member.username}</p>
                </>
            )}
        </>
    );
}
