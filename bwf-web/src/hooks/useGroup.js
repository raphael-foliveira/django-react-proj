import { useState, useEffect } from "react";
import { getGroup } from "../services/group-services";

function useGroup(groupId) {

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const getData = () => {
        getGroup(groupId).then(data => {
            setGroup(data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError(true);
        })
    };
    
    useEffect(() => {
        getData();
    }, []);

    return [group, loading, error];
}

export default useGroup;