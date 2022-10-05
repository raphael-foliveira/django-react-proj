export async function getGroup(id){
    let response = await fetch(`${process.env.REACT_APP_API_URL}/groups_detailed/${id}`);
    return response.json();
};

export async function getGroupsList(){
    return fetch(`${process.env.REACT_APP_API_URL}/groups/`)
          .then(response => response.json())
}

export async function createGroup(userToken, newGroupData){
    let response = await fetch(`${process.env.REACT_APP_API_URL}/groups_detailed/`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${userToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGroupData)
    });
    return response.json();
}

export async function deleteGroup(userToken, groupData) {
    return fetch(`${process.env.REACT_APP_API_URL}/groups_detailed/${groupData.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${userToken}`,
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}