import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteGroup } from "../../services/group-services";
import { useNavigate } from "react-router-dom";

export default function GroupControls(props) {

    const [authData] = useContext(AuthContext);
    const [isMember, setIsMember] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [confirmDeleteGroup, setConfirmDeleteGroup] = useState(false);

    const navigate = useNavigate();

    let groupControlButton = <Button onClick={props.joinGroup}>Join Group</Button>;
    
    const checkIsAdmin = (member) => {
        if (member.admin) {
            setIsAdmin(true);
        }
    }
    
    const handleDeleteGroup = () => {
        deleteGroup(authData.token, props.groupData).then(data => navigate("/"));
    }

    const checkUserStatus = (groupData) => {
        groupData?.members.forEach((member) => {
            if (member.user.id === authData.user.id) {
                setIsMember(true);
                checkIsAdmin(member);
                return true;
            }
        });
        return false;
    } 

    useEffect(() => {
        checkUserStatus(props.groupData);
    }, [props.groupData]);

    if (isMember) {
        groupControlButton = <Button onClick={props.leaveGroup}>Leave Group</Button>
    }

    return (
        <>
            {groupControlButton}
            {isAdmin && <Button onClick={handleDeleteGroup}>Delete Group</Button>}
        </>
    );
}
