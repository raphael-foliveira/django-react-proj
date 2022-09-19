const apiEndpoint = 'http://localhost:8000/api'

export function authorizeUser(credentials) {
    return fetch(`${apiEndpoint}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(response => response.json() )
}

export function registerNewUser(newUserData) {
    return fetch(`${apiEndpoint}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json());
}

export function uploadAvatar(profileId, data, token) {
    return fetch(`${apiEndpoint}/userprofiles/${profileId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: data
    })
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function updateUserPassword(userId, newPassword, token) {
    return fetch(`${apiEndpoint}/change-password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            newPassword: newPassword,
            userId: userId
        })
    }).then(response => response.json())
    .catch(error => console.log(error));
}

export function getUserProfile(profileId) {
    return fetch(`${apiEndpoint}/userprofiles/${profileId}/`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getUserAccountInfo(userId, token) {
    return fetch(`${apiEndpoint}/users/${userId}`)
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

export function userJoinGroup(userId, groupId, token) {
    return fetch(`${apiEndpoint}/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            'userId': userId,
            'groupId': groupId
        })
    }).then(response => response.json())
    .catch(error => console.log(error));
}

export function userLeaveGroup(userId, groupId, token) {
    return fetch(`${apiEndpoint}/leave`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            'userId': userId,
            'groupId': groupId
        })
    }).then(response => response.json())
    .catch(error => console.log(error));
}

