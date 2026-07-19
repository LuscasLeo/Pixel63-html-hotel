import { GroupBadgeData } from "@pixel63/events";
import GroupBadgeEditor from "@UserInterface/Components/Groups/Editor/GroupBadgeEditor";

export type RoomGroupCreationBadgeStepProps = {
    data?: GroupBadgeData;
    onChange: (data: GroupBadgeData) => void;
}

export default function RoomGroupCreationBadgeStep({ data, onChange }: RoomGroupCreationBadgeStepProps) {
    return (
        <GroupBadgeEditor data={data} onChange={onChange}/>
    );
}