import DialogStep from "@UserInterface/Common/Dialog/Components/Step/DialogStep";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import { ReactNode, useMemo } from "react";

export type DialogStepsContentProps = {
    currentStepIndex: number;
    
    steps: {
        label: ReactNode;

        title: string;
        description: string;

        image?: ReactNode;
    }[];
};

export default function DialogStepsContent({ currentStepIndex, steps }: DialogStepsContentProps) {
    const currentStep = useMemo(() => {
        return steps[currentStepIndex];
    }, [steps, currentStepIndex]);

    return (
        <FlexLayout gap={8} direction="column" style={{
            background: "#B3B099",
            padding: 8,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                {steps.map((step, index) => (
                    <DialogStep key={index} active={currentStepIndex === index} position={(index === 0)?("first"):((index === steps.length - 1)?("final"):(undefined))}>
                        {step.label}
                    </DialogStep>
                ))}
            </div>

            <FlexLayout direction="row" gap={16} align="center">
                <div>
                    {currentStep.image}
                </div>

                <FlexLayout gap={0} direction="column" style={{
                    flexWrap: "wrap"
                }}>
                    <b style={{
                        fontSize: 24
                    }}>
                        {currentStep.title}
                    </b>

                    <p>{currentStep.description}</p>
                </FlexLayout>
            </FlexLayout>
        </FlexLayout>
    );
}