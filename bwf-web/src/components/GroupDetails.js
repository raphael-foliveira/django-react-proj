import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useGroup from "../hooks/useGroup";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AlarmIcon from '@mui/icons-material/Alarm';
import {formatDate, formatTime} from '../services/datetime-services';


function GroupDetails() {

    const { id } = useParams();
    const [data, loading, error] = useGroup(id);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        setGroup(data);
    }, [data]);

    if (error) return <h3>Error</h3>;
    if (loading) return <h3>Loading...</h3>;

    return (
        <div>
            {group && (
                <div>
                    <h3>Name:</h3>
                    <p>{group.name}</p>
                    <h3>Location:</h3>
                    <p>{group.location}</p>
                    <h3>Description:</h3>
                    <p>{group.description}</p>
                    { (group.events.length > 0) && (
                    <React.Fragment>
                        <h3>Events:</h3>
                        <ul>
                            {group.events.map((event) => {
                                return (
                                    <li key={event.id}>
                                        <p>
                                        {event.team_1} ({event.score_1}) vs
                                        ({event.score_2}) {event.team_2}
                                        </p>
                                        <p><CalendarTodayIcon color="primary" /> {formatDate(event.time)} </p>
                                        <p><AlarmIcon color="primary" /> {formatTime(event.time)}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </React.Fragment>
                    )}
                </div>
            )}
        </div>
    );
}

export default GroupDetails;
