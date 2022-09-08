import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/user-services';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const StyledImg = styled.img`
    max-width: 100%;
    height: auto;
`

const LargeAvatar = styled(Avatar)`
    width: 100%;
    height: auto;
`


function User(props) { 

    const [authData, setLoggedInUser] = useContext(AuthContext);
    const [imageDisplay, setImageDisplay] = useState();

    useEffect(() => {
        getUserProfile(authData.user.profile)
        .then(data => setImageDisplay(data.image))
        .catch(error => console.log(error));
    },[]);

    return (
        <div>
            {imageDisplay && <LargeAvatar src={imageDisplay}/>}
            <p style={{textAlign: "center"}}>Welcome {props.userName}</p>
        </div>
    );
}

export default User;