import { clientInstance } from "../../..";
import { useSettings } from "../../Hooks/useSettings";
import Dialog from "../../Common/Dialog/Dialog";
import DialogContent from "../../Common/Dialog/Components/DialogContent";
import AudioSlider from "@UserInterface/Common/Dialog/Components/AudioSlider/AudioSlider";
import DialogButton from "@UserInterface/Common/Dialog/Components/Button/DialogButton";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";

export type AudioSettingsDialogProps = {
    hidden?: boolean;
    onClose?: () => void;
}

export default function AudioSettingsDialog({ hidden, onClose }: AudioSettingsDialogProps) {
    const settings = useSettings();

    return (
        <Dialog title="Audio Settings" hidden={hidden} onClose={onClose} width={300} height={240} initialPosition="center">
            <DialogContent>
                <b>Trax Audio Volume</b>

                <AudioSlider min={0} max={100} value={settings.traxAudioVolume ?? 50} onChange={(value) => {
                    clientInstance.settings.value.traxAudioVolume = value;
                    clientInstance.settings.update();
                }}/>
                
                <b>Furniture Audio Volume</b>

                <AudioSlider min={0} max={100} value={settings.furnitureAudioVolume ?? 50} onChange={(value) => {
                    clientInstance.settings.value.furnitureAudioVolume = value;
                    clientInstance.settings.update();
                }}/>
                
                <b>System Audio Volume</b>

                <AudioSlider min={0} max={100} value={settings.systemAudioVolume ?? 50} onChange={(value) => {
                    clientInstance.settings.value.systemAudioVolume = value;
                    clientInstance.settings.update();
                }}/>

                <div style={{ flex: 1 }}/>

                <FlexLayout direction="row" justify="flex-end">
                    <DialogButton onClick={onClose}>Close</DialogButton>
                </FlexLayout>
            </DialogContent>
        </Dialog>
    );
}
