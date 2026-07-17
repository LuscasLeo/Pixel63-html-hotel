export type MembershipLabelProps = {
    membership: string;
}

export default function MembershipLabel({ membership }: MembershipLabelProps) {
    switch(membership) {
        case "habboclub": {
            return "Habbo Club";
        }

        case "habbogroup": {
            return "Habbo Group";
        }
    }

    return null;
}
