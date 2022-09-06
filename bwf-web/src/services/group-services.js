

export async function getGroup(id){
    return fetch(`http://localhost:8000/api/groups/${id}`)
        .then(response => response.json());
};

export async function getGroupsList(){
    return fetch('http://localhost:8000/api/groups/')
          .then(response => response.json())
}