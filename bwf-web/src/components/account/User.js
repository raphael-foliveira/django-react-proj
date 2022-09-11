import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/user-services';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const LargeAvatar = styled(Avatar)`
    width: 180px;
    height: 180px;
`


export default function User(props) { 

    const [authData] = useContext(AuthContext);
    const [imageDisplay, setImageDisplay] = useState();

    useEffect(() => {
        getUserProfile(authData.user.id)
        .then(data => setImageDisplay(data.image))
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {imageDisplay && <LargeAvatar src={imageDisplay}/>}
            <p style={{textAlign: "center"}}>Welcome {props.userName}</p>
        </div>
    );
}

