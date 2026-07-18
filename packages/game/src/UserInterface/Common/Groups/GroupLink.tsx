import { GroupData } from "@pixel63/events";
import { useDialogs } from "@UserInterface/Hooks/useDialogs";

export type GroupLinkProps = {
    group?: GroupData;
    reversed?: boolean;
};

export default function GroupLink({ group, reversed }: GroupLinkProps) {
    const dialogs = useDialogs();

    if(!group) {
        return null;
    }

    return (
        <div style={{
            width: "max-content",
            display: "flex",
            flexDirection: (reversed)?("row-reverse"):("row"),
            gap: 5,
            alignItems: "center",
            pointerEvents: "auto",
            cursor: "pointer"
        }} onClick={() => dialogs.addUniqueDialog("group-profile", group.id, group.id)}>
            <div className="sprite_groups_icon"/>

            <div>{group.name}</div>
        </div>
    );
}
