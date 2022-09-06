import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function authorizeUser(credentials) {
    return fetch('http://localhost:8000/api/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(response => response.json() )
}

export function registerNewUser(newUserData) {
    return fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json());
}

export function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bwf-user'));
}

export function setUserToLocalStorage(userData) {
    return localStorage.setItem('bwf-user', JSON.stringify(userData));
}

export function removeUserFromLocalStorage() {
    return localStorage.removeItem('bwf-user');
}

