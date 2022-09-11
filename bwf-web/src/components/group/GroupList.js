import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { getGroupsList } from "../../services/group-services";
import useGroupsList from "../../hooks/useGroupsList";

export default function GroupList(props) {
  const [data, loading, error] = useGroupsList() 
  const [groups, setGroups] = useState(null);

  useEffect(
    () => {
      setGroups(data)
    }, [data]);
  
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <div>
        { groups && groups.map(group => {
          return (
            <Link key={group.id} to={`/details/${group.id}`}>
                <div className='single-group'>
                    <h3>{group.name}</h3>
                    <h5>{group.location}</h5>
                </div>
            </Link>
          )
        }) }
    </div>
  );
};