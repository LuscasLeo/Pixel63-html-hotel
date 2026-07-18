export type MembershipSmallIconProps = {
    membership: string;
}

export default function MembershipSmallIcon({ membership }: MembershipSmallIconProps) {
    switch(membership) {
        case "habboclub": {
            return (<div className="sprite_habboclub_small"/>);
        }

        case "habbogroup": {
            return (<div className="sprite_groups_icon" style={{
                marginTop: -6
            }}/>);
        }
    }

    return null;
}
