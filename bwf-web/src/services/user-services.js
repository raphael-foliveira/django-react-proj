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

export function uploadAvatar(profileId, data) {
    return fetch(`http://localhost:8000/api/userprofiles/${profileId}/`, {
        method: 'PUT',
        body: data
    })
    .then(response => {
        console.log(response);
        response.json()})
    .catch(error => console.log(error));
}

export function updateUserPassword(userId, newPassword) {
    return fetch(`http://localhost:8000/api/change-password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newPassword: newPassword,
            userId: userId
        })
    }).then(response => response.json())
    .catch(error => console.log(error));
}

export function getUserProfile(profileId) {
    return fetch(`http://localhost:8000/api/userprofiles/${profileId}/`)
    .then(response => response.json())
    .catch(error => console.log(error));
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

