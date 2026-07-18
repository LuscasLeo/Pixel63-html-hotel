import { webSocketClient } from "@Game/index";
import { GroupData, GroupMemberData, JoinGroupData, LeaveGroupData, UserGroupData } from "@pixel63/events";
import TimeSinceDate from "@UserInterface/Common/Date/TimeSinceDate";
import DialogButton from "@UserInterface/Common/Dialog/Components/Button/DialogButton";
import DialogLink from "@UserInterface/Common/Dialog/Components/Link/DialogLink";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import UserLink from "@UserInterface/Common/Users/UserLink";
import GroupBadgeImage from "@UserInterface/Components/Groups/GroupBadgeImage";
import { useDialogs } from "@UserInterface/Hooks/useDialogs";
import useUserGroup from "@UserInterface/Hooks/useUserGroup";
import { useCallback } from "react";

export type GroupCardProps = {
    data?: GroupData;
}

export default function GroupCard({ data }: GroupCardProps) {
    const dialogs = useDialogs();

    const userGroup = useUserGroup(data?.id);

    const handleJoin = useCallback(() => {
        webSocketClient.sendProtobuff(JoinGroupData, JoinGroupData.create({
            groupId: data?.id
        }));
    }, [data]);

    const handleLeaveGroup = useCallback(() => {
        webSocketClient.sendProtobuff(LeaveGroupData, LeaveGroupData.create({
            groupId: data?.id
        }));
    }, [data]);

    if(!data) {
        return null;
    }

    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "column",

            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#5D5D5A",
            borderRadius: 5,

            background: "#CBCBCB",

            padding: 8
        }}>
            <FlexLayout direction="row">
                <FlexLayout flex={1} direction="column" align="center">
                    <div>
                        <GroupBadgeImage data={data?.badge} scale={2}/>
                    </div>
                </FlexLayout>
                
                <FlexLayout flex={2} gap={2} direction="column">
                    <b>{data?.name}</b>

                    <div>Created <TimeSinceDate date={new Date(data.createdAt)}/> by <UserLink id={data.owner?.id} name={data.owner?.name} reversed/></div>

                    {(data.description) && (
                        <p>{data.description}</p>
                    )}
                </FlexLayout>
            </FlexLayout>
            
            <FlexLayout direction="row" flex={1}>
                <FlexLayout flex={1} direction="column" align="center">
                    {(data.membersCount > 0) && (
                        <DialogLink onClick={() => dialogs.openUniqueDialog("group-members", data.id)}>Members: {data.membersCount}</DialogLink>
                    )}
                </FlexLayout>
                
                <FlexLayout flex={2} gap={2} direction="column">
                    <DialogLink>Go to Group homeroom</DialogLink>
                    <DialogLink>Buy Group Furni</DialogLink>
                </FlexLayout>
            </FlexLayout>

            <div>
                {(!userGroup)?(
                    <DialogButton onClick={handleJoin}>Join Group</DialogButton>
                ):(
                    (!userGroup.owner) && (
                        <DialogButton onClick={handleLeaveGroup}>Leave Group</DialogButton>
                    )
                )}

                {(userGroup?.owner) && (
                    <DialogButton onClick={() => dialogs.openUniqueDialog("group-settings", data.id)}>Edit Group</DialogButton>
                )}
            </div>
        </div>
    );
}