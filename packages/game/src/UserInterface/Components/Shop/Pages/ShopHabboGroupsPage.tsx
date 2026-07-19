import { ShopPageProps } from "./ShopPage";
import { useDialogs } from "../../../Hooks/useDialogs";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import DialogButton from "@UserInterface/Common/Dialog/Components/Button/DialogButton";

export default function ShopHabboGroupsPage({ page }: ShopPageProps) {
    const dialogs = useDialogs();

    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "column",

            gap: 10,

            overflow: "hidden"
        }}>
            <FlexLayout flex={1} direction="column" justify="center" align="center" style={{
                padding: "2em 0"
            }}>
                <FlexLayout style={{ flex: 1 }}>
                    <p>Habbo Groups are a great way to stay in touch with your friends and share your interests. Each Group has a homeroom that can be decorated by other Group members</p>
                    <p>Members can also purchase exclusive Group Furni that can be customized with your Group colors!</p>

                    <b>What's so great about Habbo Groups?</b>

                    <p>
                        * Get together with people you get together with!<br/>
                        * Co-op room decorating for group members<br/>
                        * Show off your group badge!<br/>
                        * Get some neat Furni in your group's colors!
                    </p>
                </FlexLayout>

                {(page.teaser) && (
                    <FlexLayout direction="row" justify="center" align="center">
                        <img src={`./assets/shop/teasers/${page.teaser}`}/>
                    </FlexLayout>
                )}

                <div style={{ flex: 1 }}/>

                <DialogButton color="green" onClick={() => {
                    dialogs.addUniqueDialog("room-group-creation", {
                        page
                    });
                }}>
                    Create Habbo Group
                </DialogButton>
            </FlexLayout>
        </div>
    );
}
