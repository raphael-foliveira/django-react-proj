import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { createGroup } from "../../services/group-services";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const InlineTextField = styled(TextField)`
    margin-top: 10px;
`;

export default function CreateGroupForm(props) {
    const navigate = useNavigate();

    const [authData] = useContext(AuthContext);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupLocation, setNewGroupLocation] = useState("");
    const [newGroupDescription, setNewGroupDescription] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    let keyCount = 0;

    const updateErrorMessages = (newError) => {
        setErrorMessages((prevErrors) => [...prevErrors, newError]);
    };

    const changeGroupName = (event) => {
        setNewGroupName(event.target.value);
    };
    const changeGroupLocation = (event) => {
        setNewGroupLocation(event.target.value);
    };
    const changeGroupDescription = (event) => {
        setNewGroupDescription(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (errorMessages.length > 0) {
            return;
        }
        createGroup(authData.token, {
            newGroupName,
            newGroupLocation,
            newGroupDescription,
            userId: authData.user.id,
        });
        navigate("/");
    };

    const errorHandler = () => {
        setErrorMessages([]);
        if (!newGroupName) {
            updateErrorMessages("The new group must have a name!");
        }
        if (!newGroupLocation) {
            updateErrorMessages("The new group must have a location!");
        }
        if (!newGroupDescription) {
            updateErrorMessages("The new group must have a description!");
        }
    };

    return (
        <form action="" onSubmit={handleSubmit} style={{ maxWidth: "200px" }}>
            <InlineTextField label="Group Name" id="groupName" onChange={changeGroupName} />
            <InlineTextField label="Group Location" id="groupLocation" onChange={changeGroupLocation} />
            <InlineTextField label="Group Description" id="groupDescription" onChange={changeGroupDescription} />
            <Button type="submit" style={{ marginTop: "1rem" }} onClick={errorHandler} color="primary">
                Create Group
            </Button>
            {errorMessages && (
                <ul>
                    {errorMessages.map((error) => (
                        <li key={keyCount++}>{error}</li>
                    ))}
                </ul>
            )}
        </form>
    );
}
