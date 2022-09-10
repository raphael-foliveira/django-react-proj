import React from "react";
import { Card, CardContent } from "@mui/material";
import styled from "styled-components";

const ForwardCard = styled(Card)`
    z-index: 1;
    justify-self: flex-end;
    width: 250px;
    box-shadow: 5px 5px 5px #000;
    opacity: 0.6;
    text-align: center;
    position: absolute;
    right: 30px;
`;

function NotificationCard(props) {
    return (
        <ForwardCard>
            <CardContent>
                {props.title}
                <hr />
                {props.children}
            </CardContent>
        </ForwardCard>
    );
}

export default NotificationCard;
