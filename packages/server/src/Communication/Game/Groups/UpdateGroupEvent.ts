import { GetGroupData, UpdateGroupData } from "@pixel63/events";
import ProtobuffListener from "../../Interfaces/ProtobuffListener";
import User from "../../../Users/User";
import { GroupModel } from "../../../Database/Models/Groups/RoomGroupModel";
import { UserGroupModel } from "../../../Database/Models/Users/Groups/UserGroupModel";
import { game } from "../../..";
import { RoomModel } from "../../../Database/Models/Rooms/RoomModel";
import GetGroupEvent from "./GetGroupEvent";

export default class UpdateGroupEvent implements ProtobuffListener<UpdateGroupData> {
    minimumDurationBetweenEvents?: number = 500;

    async handle(user: User, payload: UpdateGroupData): Promise<void> {
        const group = await GroupModel.findByPk(payload.id);

        if(!group) {
            throw new Error("Group does not exist.");
        }

        const roomModel = await RoomModel.findOne({
            where: {
                groupId: group.id
            }
        });

        if(!roomModel) {
            throw new Error("Room does not exist.");
        }

        const userGroup = await UserGroupModel.findOne({
            where: {
                userId: user.model.id,
                groupId: group.id
            }
        });

        if(!userGroup) {
            throw new Error("User is not in group.");
        }

        if(!userGroup.owner) {
            throw new Error("User is not owner of group.");
        }

        await group.update({
            name: payload.name,
            description: payload.description,

            type: payload.type,
            rights: payload.rights,

            primaryColor: payload.primaryColor,
            secondaryColor: payload.secondaryColor,

            badge: payload.badge
        });

        const room = game.roomManager.getRoomInstance(roomModel.id);

        if(room) {
            await room.group.update();
        }

        await new GetGroupEvent().handle(user, GetGroupData.create({
            id: group.id
        }));
    }
}
