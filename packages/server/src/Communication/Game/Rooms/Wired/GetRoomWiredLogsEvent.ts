import { GetRoomWiredLogsData, GetRoomWiredMonitorData, RoomWiredLogsData, RoomWiredMonitorData } from "@pixel63/events";
import ProtobuffListener from "../../../Interfaces/ProtobuffListener.js";
import User from "../../../../Users/User.js";

export default class GetRoomWiredLogsEvent implements ProtobuffListener<GetRoomWiredLogsData> {
    minimumDurationBetweenEvents?: number = 1000;

    async handle(user: User, payload: GetRoomWiredLogsData) {
        if(!user.room) {
            return;
        }

        const roomUser = user.room.getRoomUser(user);

        if(!roomUser.hasRights()) {
            return;
        }

        const room = user.room;

        let filteredLogs = room.wired.logs;

        if(payload.level) {
            filteredLogs = filteredLogs.filter((log) => log.level === payload.level);
        }

        if(payload.search?.length) {
            const lowerCasedSearch = payload.search.toLowerCase();

            filteredLogs = filteredLogs.filter((log) => log.message.toLowerCase().includes(lowerCasedSearch));
        }

        filteredLogs.reverse();

        const logsPerPage = 20;

        filteredLogs = filteredLogs.slice(payload.page * logsPerPage, Math.min((payload.page * logsPerPage) + logsPerPage, filteredLogs.length));

        user.sendProtobuff(RoomWiredLogsData, RoomWiredLogsData.create({
            roomId: user.room.model.id,

            logs: filteredLogs.map((log) => ({
                category: log.category,
                level: log.level,
                message: log.message,
                timestamp: log.timestamp
            })),

            maxPages: Math.floor(filteredLogs.length / logsPerPage)
        }));
    }
}
