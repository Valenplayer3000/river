import * as React from "react";
import { supabase } from "../lib/supabase";

import {
    Card,
    Typography,
    CardContent,
    Stack,
    CircularProgress,
    Container,
} from "@mui/material"

import Badges from "./Badges"

export default function Posts() {
    // Get content, author from the database
    const [postdata, setPostData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<Boolean>(true);
    const [error, setError] = React.useState<string>("");

    async function getPosts() {
        try {
            setLoading(true);

            // Thanks @stationarystation for this contribution
            const { data, status, error } = await supabase
                .from("Posts")
                .select(
                    "id, content, user_id, profiles ( username, creator, verified, donator, moderator, dev)"
                )
                .order("id", { ascending: false });

            if (error && status !== 406) {
                throw error;
            }
            // Thanks @stationarystation for this contribution x2
            if (data) setPostData(data);
        } catch (e: string | any) {
            setError("Oppsie! We awe unabwe to weach ouw database. Check at DevTools at Consowe! >~<");
            console.error(e.message || e.error_message);
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            <div className="card-on">
                {loading ? (
                    <>
                        <Container maxWidth="md" fixed>
                                <CircularProgress sx={{marginInline: "auto"}} size={100} />
                        </Container>
                    </>
                ) : (
                    <>
                        <Container maxWidth="md" fixed>
                            <Stack gap={1}>
                                {postdata.map((item: any) => (
                                    <>
                                        <Card key={item.id}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">{item.profiles.username}</Typography>
                                                <Stack gap={0.2} direction="row">
                                                    {item.profiles.creator && <Badges isCreator />}
                                                    {item.profiles.verified && <Badges isVerified />}
                                                    {item.profiles.moderator && <Badges isMod />}
                                                    {item.profiles.dev && <Badges isDev />}
                                                    {item.profiles.donator && <Badges isDonator />}
                                                </Stack>
                                                <Typography variant="body1" component="p">
                                                    {item.content}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </>
                                ))}
                            </Stack>
                        </Container>
                    </>
                )}
                {error ? (
                    <>
                        <Container>
                            <Card variant="outlined" elevation={12}>
                                <div className="forcecenter">
                                    <Typography variant="h4">{error}</Typography>{" "}
                                    <Typography>
                                        Oppsie! We awe unabwe to weach ouw database. Check at DevTools at Consowe! {`>`}~{`<`}
                                    </Typography>
                                </div>
                            </Card>
                        </Container>
                    </>
                ) : null}
            </div>
        </>
    );
}