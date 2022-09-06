import { useState, useEffect } from "react";
import { getGroupsList } from "../services/group-services";

function useGroupsList() {
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        return await getGroupsList()
            .then((data) => {
                setGroups(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
            });
    };
    
    useEffect(() => {
        getData();
    },[]);


    return [groups, loading, error];
}

export default useGroupsList;
