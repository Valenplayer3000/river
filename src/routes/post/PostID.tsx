// Status: Working on
import { Card, CardContent, Typography, Stack } from "@mui/material"
import * as React from "react"
import ReactMarkdown from "react-markdown"
import Badges from "../../components/Badges"

import { supabase } from "../../lib/supabase"

export default function PostID() {
    const [post, setPost] = React.useState<any>()
    const [loading, setLoading] = React.useState<boolean>(false)

    async function getPostID() {
        try {
            const { data, status, error } = await supabase
                .from("Post")
                .select("id, content, profiles ( username, creator, verified, donator, moderator, dev)")
                .single()

            if (error && status !== 406) {
                throw error;
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
                    <Typography variant="h5" component="div">Experminental Feature</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.2, sm: 0.2, md: 0.2 }}>
                        <Badges isCreator />
                        <Badges isVerified />
                        <Badges isMod />
                        <Badges isDev />
                        <Badges isDonator />
                        <Badges isBanned />
                    </Stack>
                    <Typography variant="body1" component="p">
                        <ReactMarkdown>
                            # ** THIS FEATURE ISN'T COMPLETE **
                        </ReactMarkdown>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}