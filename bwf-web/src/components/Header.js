import React from "react";
import logo from '../assets/logo_frame.png';
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

function Header(props) {
    return (
        <div className={classes.header}>
            <Link to="/">
                <img src={logo} alt="BWF Logo" height="150px"/>
            </Link>
        </div>
    );
};

export default Header;