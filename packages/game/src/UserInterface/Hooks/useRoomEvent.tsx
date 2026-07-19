import { useEffect, useState } from "react";
import { useRoomInstance } from "@UserInterface/Hooks/useRoomInstance";

export function useRoomEvent() {
    const room = useRoomInstance();

    const [value, setValue] = useState(room?.event.value);
    const [_state, setState] = useState(room?.event.state);

    useEffect(() => {
        return room?.event?.subscribe((value) => {
            setValue(value);
            setState(room.event.state);
        });
    }, [room]);

    return value;
}
