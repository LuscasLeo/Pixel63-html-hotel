import { GetUserGroupsData, GroupData, UserGroupsData } from "@pixel63/events";
import { useEffect, useState } from "react";
import { webSocketClient } from "@Game/index";

export default function useUserGroups() {
    const [groups, setGroups] = useState<GroupData[]>([]);

    useEffect(() => {
        const listener = webSocketClient.addProtobuffListener(UserGroupsData, {
            async handle(payload: UserGroupsData) {
                setGroups(payload.groups);
            },
        });

        webSocketClient.sendProtobuff(GetUserGroupsData, GetUserGroupsData.create({}));

        return () => {
            webSocketClient.removeProtobuffListener(UserGroupsData, listener);
        };
    }, []);

    return groups;
}
