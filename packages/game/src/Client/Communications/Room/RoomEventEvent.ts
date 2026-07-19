import { clientInstance } from "../../..";
import ProtobuffListener from "@Client/Communications/ProtobuffListener";
import { RoomEventData } from "@pixel63/events";

export default class RoomEventEvent implements ProtobuffListener<RoomEventData> {
    async handle(payload: RoomEventData) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }

        if(clientInstance.roomInstance.value.information?.id !== payload.roomId) {
            throw new Error("Event room id does not match current room id.");
        }
        
        if(payload.expiresAt) {
            clientInstance.roomInstance.value.event.value = payload;
        }
        else {
            clientInstance.roomInstance.value.event.value = undefined;
        }
    }
}
