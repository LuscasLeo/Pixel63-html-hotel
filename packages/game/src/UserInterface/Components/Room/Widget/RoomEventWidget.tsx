import DialogLink from "@UserInterface/Common/Dialog/Components/Link/DialogLink";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import useShopPageLink from "@UserInterface/Components/Shop/Hooks/useShopPageLink";
import { useRoomEvent } from "@UserInterface/Hooks/useRoomEvent";
import { useRoomInstance } from "@UserInterface/Hooks/useRoomInstance";

export default function RoomEventWidget() {
    const room = useRoomInstance();
    const roomEvent = useRoomEvent();

    const { openShopPage } = useShopPageLink("roomevent");

    if(!roomEvent && !room?.isOwner) {
        return null;
    }

    return (
        <div style={{
            borderRadius: 6,

            pointerEvents: "auto",

            border: "2px solid rgba(61, 61, 61, .95)",
            background: "rgba(0, 0, 0, 0.64)",

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
                background: "rgba(115, 115, 115, .95)",
                borderRadius: (!roomEvent)?(8):(3),
                fontSize: 13,

                textAlign: "center",

                position: "relative"
            }}>
                <FlexLayout direction="row" align="center">
                    <div className="sprite_navigator_event"/>

                    {(roomEvent)?(
                        <div>{roomEvent.name}</div>
                    ):(
                        <DialogLink onClick={openShopPage}>
                            <b>Promote room</b>
                        </DialogLink>
                    )}
                </FlexLayout>
            </div>
            
            <FlexLayout direction="row" style={{
                padding: "8px 16px 8px 8px"
            }}>
                <div>{roomEvent?.description}</div>
            </FlexLayout>
        </div>
    );
}
