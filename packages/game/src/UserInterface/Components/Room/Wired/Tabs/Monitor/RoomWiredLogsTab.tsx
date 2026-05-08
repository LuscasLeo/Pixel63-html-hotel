import DialogTable from "@UserInterface/Common/Dialog/Components/Table/DialogTable";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import useRoomWiredLogs from "@UserInterface/Components/Room/Wired/Tabs/Monitor/Hooks/useRoomWiredLogs";
import { useTranslation } from "react-i18next";

export default function RoomWiredLogsTab() {
    const [getWiredTranslation] = useTranslation("wired");

    const { logs } = useRoomWiredLogs(0, "", "");

    return (
        <FlexLayout flex={1} direction="column">
            <FlexLayout flex={1} direction="column" gap={5}>
                <DialogTable
                    flex={[1, 1, 4]}
                    columns={[getWiredTranslation("monitor.timestamp"), getWiredTranslation("monitor.level"), getWiredTranslation("monitor.message")]}
                    items={logs?.logs.map((log, index) => ({
                        id: index,
                        values: [
                            new Date(log.timestamp).toLocaleTimeString(),
                            log.level,
                            log.message
                        ]
                    }))}
                    empty={getWiredTranslation("monitor.no_logs")}
                    />
            </FlexLayout>
        </FlexLayout>
    );
}
