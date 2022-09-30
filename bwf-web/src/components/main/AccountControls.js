import React, {useContext} from "react";
import { Button } from "@mui/material";
import User from "../account/User";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AccountControls(props) {

    const [authData, setLoggedInUser] = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
        window.location.reload();
    };

    const goToMyAccountPage = () => {
        navigate("/account");
    };

    const goToCreateGroup = () => {
        navigate("/create-group")
    }


    return (
        <React.Fragment>
            <User userName={authData.user.username} />
            <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={goToMyAccountPage}
                style={{ padding: "auto" }}
            >
                My Account
            </Button>
            <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleLogout}
                style={{
                    padding: "auto",
                    marginTop: "10px",
                }}
            >
                Logout
            </Button>
            <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={goToCreateGroup}
                style={{
                    padding: "auto",
                    marginTop: "10px"
                }}>
                Create Group
            </Button>

        </React.Fragment>
    );
}
