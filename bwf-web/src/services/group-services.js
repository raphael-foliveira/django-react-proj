import { apiBaseEndpoint } from "./api-endpoint";

export async function getGroup(id){
    return fetch(`${apiBaseEndpoint}/groups_detailed/${id}`)
        .then(response => response.json());
};

export async function getGroupsList(){
    return fetch(`${apiBaseEndpoint}/groups/`)
          .then(response => response.json())
}

export async function createGroup(userToken, newGroupData){
    return fetch(`${apiBaseEndpoint}/groups_detailed/`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${userToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGroupData)
    }).then(response => response.json());
}

export async function deleteGroup(userToken, groupData) {
    return fetch(`${apiBaseEndpoint}/groups_detailed/${groupData.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${userToken}`,
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}