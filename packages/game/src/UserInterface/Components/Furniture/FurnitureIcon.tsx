import { RefObject, useEffect, useState } from "react";
import OffscreenCanvasRender from "../../Common/OffscreenCanvas/OffscreenCanvasRender";
import Furniture from "@Client/Furniture/Furniture";
import FurnitureAssets from "@Client/Assets/FurnitureAssets";
import { FurnitureData, UserFurnitureColorTag } from "@pixel63/events";

export type FurnitureIconProps = {
    ref?: RefObject<HTMLCanvasElement | null>;
    furnitureData?: FurnitureData;
    colorTags?: UserFurnitureColorTag[];
}

export default function FurnitureIcon({ ref, furnitureData, colorTags }: FurnitureIconProps) {
    const [image, setImage] = useState<ImageBitmap>();

    useEffect(() => {
        if(!furnitureData) {
            return;
        }
        
        const furnitureRenderer = new Furniture(furnitureData.type, 1, 0, 0, furnitureData.color);

        furnitureRenderer.colorTags = colorTags;

        furnitureRenderer.renderToCanvas().then((image) => {
            setImage(image);
        });
    }, [ furnitureData, colorTags ]);

    return (
        <OffscreenCanvasRender ref={ref} offscreenCanvas={image} placeholderImage={FurnitureAssets.placeholder32.image}/>
    );
}
