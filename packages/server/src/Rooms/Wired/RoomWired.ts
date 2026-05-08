import Room from "../Room";
import RoomWiredLog from "./Interfaces/RoomWiredLog";
import RoomWiredLogGroup from "./Interfaces/RoomWiredLogGroup";
import { RoomWiredLogLevel } from "./Interfaces/RoomWiredLogLevel";

export default class RoomWired {
    public logs: RoomWiredLog[] = [];

    constructor(private readonly room: Room) {

    }

    public addLog(level: RoomWiredLogLevel, category: string, message: string) {
        this.logs.push({
            level,
            category,
            message,
            timestamp: new Date().toISOString()
        });

        if(this.logs.length > 200) {
            this.logs.shift();
        }
    }

    public getLogCategories() {
        const grouped = new Map<string, RoomWiredLogGroup>();

        for(const log of this.logs) {
            if(log.level === "INFO") {
                continue;
            }

            const existing = grouped.get(log.category);

            if(existing) {
                existing.amount++;

                if(log.timestamp > existing.latestTimestamp) {
                    existing.latestTimestamp = log.timestamp;
                }
            } else {
                grouped.set(log.category, {
                    level: log.level,
                    category: log.category,
                    amount: 1,
                    latestTimestamp: log.timestamp
                });
            }
        }

        return Array.from(grouped.values());
    }
}
