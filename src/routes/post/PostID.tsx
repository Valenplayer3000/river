// Status: "Finished"
import { Card, CardContent, Typography, Stack } from "@mui/material"
import * as React from "react"
import ReactMarkdown from "react-markdown"
import Badges from "../../components/Badges"
import { useParams } from "react-router"

import { supabase } from "../../lib/supabase"

export default function PostID() {
    const [loading, setLoading] = React.useState<boolean>(false)

    const [name, setName] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [verified, setVerified] = React.useState<boolean>(false);
    const [donator, setDoantor] = React.useState<boolean>(false);
    const [moderator, setModerator] = React.useState<boolean>(false);
    const [dev, setDev] = React.useState<boolean>(false);
    const [creator, setCreator] = React.useState<boolean>(false)
    const [furry, setFurry] = React.useState<boolean>(false)
    const [banned, setBanned] = React.useState<boolean>(false)

    const { id } = useParams();

    async function getPostID() {
        try {
            const { data, status, error } = await supabase
                .from("Posts")
                .select("id, content, user_id ( username, creator, verified, donator, moderator, dev, banned, furry)")
                .eq("id", id)
                .single();


            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data);
                setName(data.user_id.username);
                setContent(data.content);
                setVerified(data.user_id.verified);
                setDoantor(data.user_id.donator);
                setModerator(data.user_id.moderator);
                setDev(data.user_id.dev);
                setCreator(data.user_id.creator);
                setBanned(data.user_id.banned);
                setFurry(data.user_id.furry);
            }
        }

        catch (e: string | any) {
            console.error(e.message || e.error_message)
        }

        finally {
            setLoading(false)
        }

    }

    React.useEffect(() => {
        getPostID()
    })

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">{name}</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.2, sm: 0.2, md: 0.2 }}>
                        {creator && <Badges isCreator />}
                        {verified && <Badges isVerified />}
                        {moderator && <Badges isMod />}
                        {dev && <Badges isDev />}
                        {donator && <Badges isDonator />}
                        {banned && <Badges isBanned />}
                        {furry && <Badges isFurry />}
                    </Stack>
                    <Typography variant="body1" component="p">
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}