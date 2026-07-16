import { useEffect, useState } from "react";
import { useRoomInstance } from "@UserInterface/Hooks/useRoomInstance";

export function useRoomScale() {
  const room = useRoomInstance();

  const [scale, setScale] = useState<number | undefined>(room?.roomRenderer.scale.value);

  useEffect(() => {
    return room?.roomRenderer.scale.subscribe(setScale);
  }, [room]);

  return scale;
}
