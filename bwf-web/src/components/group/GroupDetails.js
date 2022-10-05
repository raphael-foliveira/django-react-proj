import React, { useState, useEffect, useContext, Suspense } from "react";
import { useParams } from "react-router-dom";
import useGroup from "../../hooks/useGroup";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AlarmIcon from "@mui/icons-material/Alarm";
import { formatDate, formatTime } from "../../services/datetime-services";
import { userJoinGroup, userLeaveGroup } from "../../services/user-services";
import GroupControls from "./GroupControls";
import { AuthContext } from "../../contexts/AuthContext";
const Member = React.lazy(() => import("./Member"));

export default function GroupDetails() {
    const { id } = useParams();
    const [authData] = useContext(AuthContext);
    const [groupData, loading, error] = useGroup(id);
    const [group, setGroup] = useState(null);

    const joinGroup = () => {
        let userId = authData.user.id;
        let groupId = groupData.id;
        let token = authData.token;
        userJoinGroup(userId, groupId, token);
        window.location.reload();
    };

    const leaveGroup = () => {
        let userId = authData.user.id;
        let groupId = groupData.id;
        let token = authData.token;
        userLeaveGroup(userId, groupId, token);
        window.location.reload();
    };

    useEffect(() => {
        setGroup(groupData);
    }, [groupData]);

    if (error) return <h3>Error</h3>;
    if (loading) return <h3>Loading...</h3>;

    return (
        <>
            {group && (
                <div>
                    <h3>Name:</h3>
                    <p>{group["name"]}</p>
                    <h3>Location:</h3>
                    <p>{group["location"]}</p>
                    <h3>Description:</h3>
                    <p>{group["description"]}</p>
                    {group.members.length > 0 && (
                        <>
                            <h3>Members:</h3>
                            <ul>
                                {group.members.map((member) => {
                                    return (
                                        <Suspense key={member.user.id} fallback={<div>Loading...</div>}>
                                            <Member key={member.user.id} userId={member.user.id} token={authData.token} />
                                        </Suspense>
                                    );
                                })}
                            </ul>
                        </>
                    )}

                    {group.events.length > 0 && (
                        <>
                            <h3>Events:</h3>
                            <ul>
                                {group.events.map((event) => {
                                    return (
                                        <li key={event.id}>
                                            <p>
                                                {event.team_1} ({event.score_1}) vs ({event.score_2}) {event.team_2}
                                            </p>
                                            <p>
                                                <CalendarTodayIcon color="primary" /> {formatDate(event.time)}{" "}
                                            </p>
                                            <p>
                                                <AlarmIcon color="primary" /> {formatTime(event.time)}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                    <GroupControls joinGroup={joinGroup} leaveGroup={leaveGroup} groupData={groupData} />
                </div>
            )}
        </>
    );
}
