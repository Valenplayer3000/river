import { Error, Money } from "@mui/icons-material"
import { Card, CardHeader, CardActions, CardContent, Typography, Chip, Button } from "@mui/material"
import { Stack } from "@mui/system"

export default function Donations() {
    return (
        <>
            <Card variant="outlined">
                <CardHeader title="Donations" />
                <CardContent>
                    <Stack direction="row" gap={0.2}>
                        <Typography>Status: </Typography>
                        <Chip sx={{ marginTop: -1, marginLeft: 1 }} color="error" icon={<Error />} label="Not available" />
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button disabled variant="contained" startIcon={<Money/>}>Donate</Button>
                </CardActions>
            </Card>
        </>
    )
}