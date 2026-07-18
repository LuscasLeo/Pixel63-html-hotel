import { FigureConfigurationData, FurnitureData, RoomPositionData, UserFurnitureColorTag } from "@pixel63/events";

export type RoomRendererFurnitureProps = {
    id: string;
    furniture: FurnitureData;
    externalImage?: string;
    figureConfiguration?: FigureConfigurationData;
    position?: RoomPositionData;
    panToItem?: boolean;
    colorTags?: UserFurnitureColorTag[];
};

