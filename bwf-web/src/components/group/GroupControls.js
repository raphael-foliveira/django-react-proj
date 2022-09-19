import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

export default function GroupControls(props) {

    const [authData] = useContext(AuthContext);
    const [isMember, setIsMember] = useState(false);

    const checkIsMember = (groupData) => {
        groupData.members.forEach((member) => {
            if (member.user.id == authData.user.id) {
                setIsMember(true);
                return;
            }
        })
    } 

    useEffect(() => {
        if (props.groupData) {
            checkIsMember(props.groupData);
        }
    }, [props.groupData]);

    return (
        <React.Fragment>
            {isMember ? (
                <Button onClick={props.leaveGroup}>Leave Group</Button>
            ) : (
                <Button onClick={props.joinGroup}>Join Group</Button>
            )}
        </React.Fragment>
    );
}
