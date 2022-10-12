import * as React from "react";
import { supabase } from "../lib/supabase";

import {
    Card,
    Typography,
    CardContent,
    Stack,
    Divider,
    Container,
    Skeleton,
} from "@mui/material"

import Badges from "./Badges"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

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
                    "id, content, user_id, profiles ( username, creator, verified, donator, moderator, dev, banned)"
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
                            <Card elevation={12}>
                                <CardContent>
                                    <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.1, sm: 0.2, md: 0.3 }}>
                                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem', width: 100, height: 40 }} />
                                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem', width: 100, height: 40 }} />
                                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem', width: 100, height: 40 }} />
                                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem', width: 100, height: 40 }} />
                                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem', width: 100, height: 40 }} />
                                    </Stack>
                                    <Typography variant="body1">
                                        <Skeleton variant="rounded" animation="wave" sx={{ height: 100 }} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Container>
                    </>
                ) : (
                    <>
                        <Container maxWidth="md" fixed>
                            <Stack gap={1}>
                                {postdata.map((item: any) => (
                                    <>
                                        <Card elevation={5} key={item.id}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">{item.profiles.username}</Typography>
                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.2, sm: 0.2, md: 0.2 }}>
                                                    {item.profiles.creator && <Badges isCreator />}
                                                    {item.profiles.verified && <Badges isVerified />}
                                                    {item.profiles.moderator && <Badges isMod />}
                                                    {item.profiles.dev && <Badges isDev />}
                                                    {item.profiles.donator && <Badges isDonator />}
                                                    {item.profiles.banned && <Badges isBanned />}
                                                </Stack>
                                                <Typography>
                                                    <ReactMarkdown components={{ h1: 'h2',}} remarkPlugins={[remarkGfm]}>
                                                        {item.content}
                                                    </ReactMarkdown>
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
                            <Card variant="outlined">
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