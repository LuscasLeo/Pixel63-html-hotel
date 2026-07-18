import TimeSinceDate from "@UserInterface/Common/Date/TimeSinceDate";
import DialogContent from "@UserInterface/Common/Dialog/Components/DialogContent";
import Dialog from "@UserInterface/Common/Dialog/Dialog";
import FigureImage from "@UserInterface/Common/Figure/FigureImage";
import Input from "@UserInterface/Common/Form/Components/Input";
import Selection from "@UserInterface/Common/Form/Components/Selection";
import FlexLayout from "@UserInterface/Common/Layouts/FlexLayout";
import UserLink from "@UserInterface/Common/Users/UserLink";
import GroupBadgeImage from "@UserInterface/Components/Groups/GroupBadgeImage";
import useGroup from "@UserInterface/Hooks/useGroup";
import useGroupMembers from "@UserInterface/Hooks/useGroupMembers";
import { useMemo, useState } from "react";

export type GroupMembersDialogProps = {
    data?: string;
    hidden?: boolean;
    onClose?: () => void;
}

export default function GroupMembersDialog({ data, hidden, onClose }: GroupMembersDialogProps) {
    const group = useGroup(data);

    const [name, setName] = useState<string>();
    const [filter, setFilter] = useState<string>();

    const members = useGroupMembers(data, name, filter);

    const [page, setPage] = useState(0);

    const filteredMembers = useMemo(() => {
        return members?.slice(page * 12, (page * 12) + 12);
    }, [members, page]);

    if(!group) {
        return null;
    }

    return (
        <Dialog title={`${group.name} members`} hidden={hidden} onClose={onClose} initialPosition="center" width={350} height={440}>
            <DialogContent style={{
                gap: 5
            }}>
                <FlexLayout direction="row">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        aspectRatio: 1
                    }}>
                        <GroupBadgeImage data={group.badge}/>
                    </div>
                    
                    <FlexLayout flex={1} direction="column">
                        <Input placeholder="Search for user..." value={name} onChange={setName}/>

                        <Selection value={filter} onChange={setFilter} items={[
                            {
                                value: undefined,
                                label: "Show all members"
                            },
                            {
                                value: "admins",
                                label: "Show only admins"
                            }
                        ]}/>
                    </FlexLayout>
                </FlexLayout>

                <div style={{ flex: 1 }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 5
                    }}>
                        {filteredMembers?.map((member) => (
                            <FlexLayout key={member.userId} gap={15} direction="row" style={{
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: "#5D5D5A",
                                borderRadius: 5,

                                background: "#FFFFFF",

                                padding: 4,
                            }}>
                                <div style={{
                                    width: 30
                                }}>
                                    <FigureImage figureConfiguration={member.figureConfiguration} headOnly cropped direction={2}/>
                                </div>

                                <FlexLayout gap={0} justify="center" style={{
                                    fontSize: 12
                                }}>
                                    <b>
                                        <UserLink id={member.userId} name={member.name} reversed/>
                                    </b>

                                    <FlexLayout gap={5} direction="row">
                                        {(member.owner)?(
                                            <div className="sprite_groups_owner"/>
                                        ):(
                                            (member.admin) && (
                                                <div className="sprite_groups_admin"/>
                                            )
                                        )}
                                        <i style={{ fontSize: 10 }}>Joined <TimeSinceDate date={new Date(member.createdAt)}/></i>
                                    </FlexLayout>
                                </FlexLayout>
                            </FlexLayout>
                        ))}
                    </div>
                </div>
                
                {(members) && (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5
                    }}>
                        {(members.length > 12) && (
                            <div style={{ cursor: "pointer" }} onClick={() => setPage?.(Math.max(page - 1, 0))}><b>{"<"}</b></div>
                        )}

                        <div>Page {page + 1} / {Math.floor((members.length) / 12) + 1}</div>

                        {(members.length > 12) && (
                            <div style={{ cursor: "pointer" }} onClick={() => setPage?.(Math.min(page + 1, Math.floor((members.length) / 12)))}><b>{">"}</b></div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
