import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import { ReactNode } from "react";

export type DialogStepProps = {
    position?: "first" | "final";
    active?: boolean;
    children?: ReactNode;
};

export default function DialogStep({ position, active, children }: DialogStepProps) {
    if(position === "final") {
        return (
            <div className={`sprite_dialog_steps_${position}`} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                marginRight: -6,
                fontSize: 13
            }}>
                <FlexLayout gap={10} direction="row" style={{
                    paddingBottom: 1,
                    paddingLeft: 12
                }}>
                    {children}
                </FlexLayout>
            </div>
        );
    }

    if(position) {
        return (
            <div className={`sprite_dialog_steps_${position}-${(active)?("focused"):("inactive")}`} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                marginRight: -6,
                fontSize: 13
            }}>
                <FlexLayout direction="row" style={{
                    paddingRight: 6,
                    paddingBottom: (active)?(4):(1)
                }}>
                    {children}
                </FlexLayout>
            </div>
        );
    }

    return (
        <div className={`sprite_dialog_steps_${(active)?("focused"):("inactive")}`} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            marginRight: -6,
            fontSize: 13
        }}>
            <FlexLayout direction="row" style={{
                paddingRight: 6,
                paddingBottom: (active)?(4):(1)
            }}>
                {children}
            </FlexLayout>
        </div>
    );
}
