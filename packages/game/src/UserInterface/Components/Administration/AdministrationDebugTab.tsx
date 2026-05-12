import { Figure } from "@Game/library";
import DialogButton from "@UserInterface/Common/Dialog/Components/Button/DialogButton";
import FigureImage from "@UserInterface/Common/Figure/FigureImage";
import Input from "@UserInterface/Common/Form/Components/Input";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import { useUser } from "@UserInterface/Hooks/useUser";
import { useEffect, useState } from "react";

export default function AdministrationDebugTab() {
    const user = useUser();

    const [renderDuration, setRenderDuration] = useState<number>(0);
    const [rendering, setRendering] = useState(false);
    const [rendersPerFrame, setRendersPerFrame] = useState<number>(24);

    useEffect(() => {
        if(!rendering) {
            return;
        }

        const figures = Array(24).fill(null).map((_) => new Figure(user.figureConfiguration, 2));

        let cancelled = false;

        async function handleAnimationFrame() {
            if(cancelled) {
                return;
            }

            const now = performance.now();

            for(const figure of figures) {
                await figure.renderToCanvas(0);
            }

            console.log("Render duration " + (performance.now() - now));

            window.requestAnimationFrame(handleAnimationFrame);
        }

        window.requestAnimationFrame(handleAnimationFrame);

        return () => {
            cancelled = true;
        };
    }, [rendering]);

    return (
        <FlexLayout flex={1} direction="column">
            <FlexLayout flex={1} direction="row">
                <FlexLayout justify="center" align="center" style={{
                    width: 128,
                    height: 128
                }}>
                    <FigureImage figureConfiguration={user.figureConfiguration} direction={2}/>
                </FlexLayout>

                <FlexLayout flex={1} direction="column">
                    <b>Renders per frame</b>

                    <Input value={rendersPerFrame.toString()} onChange={(value) => setRendersPerFrame(parseInt(value))}/>

                    <DialogButton style={{ alignSelf: "flex-end" }} onClick={() => setRendering(!rendering)}>{(!rendering)?("Start rendering"):("Stop rendering")}</DialogButton>
                </FlexLayout>
            </FlexLayout>

            <FlexLayout flex={1}>
                <b>Frame duration</b>

                <div>{renderDuration} ms</div>
            </FlexLayout>
        </FlexLayout>
    );
}
