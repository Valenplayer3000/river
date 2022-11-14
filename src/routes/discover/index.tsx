import * as React from "react"

import { TrendingUp, WebAsset, Groups } from "@mui/icons-material";
import { Typography, Card, CardHeader, CardContent, CardMedia, colors, Stack, CardActions, Button, ButtonGroup, CircularProgress, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";

import { Octokit } from "octokit"

import themejson from "./themes.json"

export default function Discover() {

    const [loading, SetLoading] = React.useState<boolean>(false)
    const [error, SetError] = React.useState<boolean>(false)

    const octokit = new Octokit()

    async function FetchUser() {
        try {
            SetLoading(true)
            SetError(false)
            const result = await octokit.request("GET /repos/{owner}/{repos}", { owner: "valenplayer3000", repo: "river-themes", header: {"content-type": "text/json"}})
            if (result) console.log(result);
        }
        catch (error) {
            SetLoading(false)
            SetError(true)
        }
        finally {
            SetLoading(false)
        }
    }

    React.useEffect(() => {
        FetchUser()
    },
        []);
    return (
        <>
            <Container>
                <Box sx={{ m: 2, textAlign: 'center' }}>
                    <Typography variant="h3">Discover River</Typography>
                    <Typography variant="body1">Follow some people, like tending post and get some tending themes</Typography>
                </Box>
                <Box sx={{ m: 2, textAlign: 'center' }}>
                    <Typography variant="h5"><Groups /> Featured User</Typography>
                </Box>
                <Card variant="outlined">
                    <CardHeader title="UserName" subheader="Website URL" />
                    <CardContent>
                        User Descriptions
                    </CardContent>
                </Card>
                <Box sx={{ m: 2, textAlign: 'center' }}>
                    <Typography variant="h5"><TrendingUp /> Tending Posts</Typography>
                </Box>
                <Stack gap={0.5}>
                    <Card variant="outlined">
                        <CardHeader title="UserName" />
                        <CardContent>
                            Post Content
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardHeader title="UserName2" />
                        <CardContent>
                            Post Content
                        </CardContent>
                    </Card>
                </Stack>
                <Box sx={{ m: 2, textAlign: 'center' }}>
                    <Typography variant="h5"><WebAsset /> Tending Themes</Typography>
                </Box>
                <Stack gap={0.5}>
                    {loading ? (<CircularProgress sx={{marginInline: 'auto'}} />) : (
                        <>
                            {error ? (<Alert sx={{marginInline: 'auto'}} severity="error">Unable to load themes</Alert>) : (
                                <>
                                    {themejson.map(e => (
                                        <Card key={e.id} sx={{ background: `${e.primary}`, color: "inherit" }} variant="outlined">
                                            <CardHeader title={e.theme_name} subheader={e.theme_author} />
                                            <CardContent>
                                                {e.theme_description}
                                            </CardContent>
                                            <CardActions>
                                                <Button color="inherit" href={e.link}>Get {e.theme_name}</Button>
                                            </CardActions>
                                        </Card>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Stack>
            </Container>
        </>
    )
}