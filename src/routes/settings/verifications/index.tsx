import {Card, CardHeader, CardActions, CardContent, Chip, Button, Typography, Stack, Alert} from "@mui/material"

import { Error, CheckBox } from "@mui/icons-material"

export default function Verifications() {
    return (
        <>
            <Card variant="outlined">
                <CardHeader title="Welcome to Verification Page!"/>
                <CardContent>
                    <Stack direction="row" gap={0.2} sx={{m:2}}>
                        <Typography>Status: </Typography>
                        <Chip sx={{ marginTop: -1, marginLeft: 1 }} color="error" icon={<Error />} label="Not available" />
                    </Stack>
                    <Alert severity="warning">
                        Currently Verification System is very early work in progress
                    </Alert>
                </CardContent>
                <CardActions>
                    <Button disabled variant="contained" startIcon={<CheckBox/>}>Verify</Button>
                </CardActions>
            </Card>
        </>
    )
}