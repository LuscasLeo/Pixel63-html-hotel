import { GroupData } from "@pixel63/events";
import Selection from "@UserInterface/Common/Form/Components/Selection";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import useUserGroups from "@UserInterface/Hooks/useUserGroups";

export type ShopGroupSelectorProps = {
    value?: GroupData;
    onChange: (value: GroupData) => void;
}

export default function ShopGroupSelector({ value, onChange }: ShopGroupSelectorProps) {
    const groups = useUserGroups();

    return (
        <Selection placeholder="Select a group..." value={value} items={groups.map((group) => {
            return {
                label: (
                    <FlexLayout direction="row" align="center">
                        <div className="sprite_groups_icon"/>

                        {group.name}
                    </FlexLayout>
                ),
                value: group
            }
        })} onChange={onChange}/>
    );
}