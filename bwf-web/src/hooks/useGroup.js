import { useState, useEffect, useContext } from "react";
import { getGroup } from "../services/group-services";
import { AuthContext } from "../contexts/AuthContext";

function useGroup(groupId) {

    const [authData] = useContext(AuthContext);

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = async () => {
        return getGroup(groupId).then(data => {
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