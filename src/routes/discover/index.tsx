import * as React from "react"

import { TrendingUp, WebAsset, Groups } from "@mui/icons-material";
import { Typography, Card, CardHeader, CardContent, CardMedia, colors, Stack, CardActions, Button, ButtonGroup, CircularProgress, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";

import { Octokit } from "octokit"

import themejson from "./themes.json"

export default function Discover() {
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
                    <Alert severity="info">Coming Soon</Alert>
                </Stack>
            </Container>
        </>
    )
}