import { webSocketClient } from "@Game/index";
import { GetRoomWiredLogsData, RoomWiredLogsData } from "@pixel63/events";
import { useCallback, useEffect, useState } from "react";

export default function useRoomWiredLogs(page: number, search: string, level: string) {
    const [logs, setLogs] = useState<RoomWiredLogsData>();

    useEffect(() => {
        const listener = webSocketClient.addProtobuffListener(RoomWiredLogsData, {
            async handle(payload: RoomWiredLogsData) {
                setLogs(payload);
            },
        });

        const timer = setInterval(() => {
            webSocketClient.sendProtobuff(GetRoomWiredLogsData, GetRoomWiredLogsData.create({}));
        }, 15 * 1000);

        webSocketClient.sendProtobuff(GetRoomWiredLogsData, GetRoomWiredLogsData.create({
            level,
            search,
            page
        }));

        return () => {
            clearInterval(timer);
            
            webSocketClient.removeProtobuffListener(RoomWiredLogsData, listener);
        };
    }, [page, search, level]);

    const handleRefresh = useCallback(() => {
        webSocketClient.sendProtobuff(GetRoomWiredLogsData, GetRoomWiredLogsData.create({}));
    }, []);

    return {
        logs,
        handleRefresh
    };
}
