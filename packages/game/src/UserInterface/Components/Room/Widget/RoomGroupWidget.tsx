import { webSocketClient } from "@Game/index";
import { JoinGroupData } from "@pixel63/events";
import DialogButton from "@UserInterface/Common/Dialog/Components/Button/DialogButton";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import GroupBadgeImage from "@UserInterface/Components/Groups/GroupBadgeImage";
import { useDialogs } from "@UserInterface/Hooks/useDialogs";
import { useRoomGroup } from "@UserInterface/Hooks/useRoomGroup";
import useUserGroup from "@UserInterface/Hooks/useUserGroup";
import { useCallback } from "react";

export default function RoomGroupWidget() {
    const dialogs = useDialogs();
    const roomGroup = useRoomGroup();
    const userGroup = useUserGroup(roomGroup?.group?.id);

    const handleJoin = useCallback(() => {
        webSocketClient.sendProtobuff(JoinGroupData, JoinGroupData.create({
            groupId: roomGroup?.group?.id
        }));
    }, [roomGroup]);

    if(!roomGroup?.group) {
        return null;
    }

    return (
        <div style={{
            borderRadius: 6,

            pointerEvents: "auto",

            border: "2px solid rgba(109, 109, 109, 0.9)",
            background: "rgba(39, 39, 39, 0.8)",

            width: 220,
            boxSizing: "border-box",

            alignSelf: "flex-end",

            fontSize: 12,
            color: "white",

            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                padding: "5px 8px 8px",
                background: "rgba(109, 109, 109, 0.9)",
                fontSize: 13,

                textAlign: "center",

                position: "relative"
            }}>
                <FlexLayout direction="row" align="center">
                    <div className="sprite_groups_icon"/>

                    <b>Group homeroom</b>
                </FlexLayout>

                <FlexLayout direction="row" align="center" style={{
                    position: "absolute",

                    right: 6,
                    top: 0,
                    bottom: 2
                }}>
                </FlexLayout>
            </div>

            <FlexLayout direction="row" style={{
                padding: "8px 16px 8px 8px",
                cursor: "pointer"
            }} onClick={() => {
                dialogs.addUniqueDialog("group", roomGroup.group?.id, roomGroup.group?.id);
            }}>
                <FlexLayout align="center" justify="center">
                    <GroupBadgeImage data={roomGroup.group.badge}/>
                </FlexLayout>

                <FlexLayout flex={1} justify="space-between" gap={2} style={{
                    padding: "2px 0"
                }}>
                    <b>{roomGroup.group.name}</b>
                </FlexLayout>
            </FlexLayout>

            {(roomGroup.group.type === "public" && !userGroup) && (
                <FlexLayout flex={1} direction="row" style={{
                    padding: 8,
                }}>
                    <DialogButton style={{ flex: 1 }} onClick={handleJoin}>Join group</DialogButton>
                </FlexLayout>
            )}

            {(roomGroup.group.type === "exclusive" && !userGroup) && (
                <FlexLayout flex={1} direction="row" style={{
                    padding: 8,
                }}>
                    <DialogButton style={{ flex: 1 }} onClick={handleJoin}>Request to join</DialogButton>
                </FlexLayout>
            )}
        </div>
    );
}
