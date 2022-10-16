import { GitHub } from "@mui/icons-material";
import { Alert, Box, Card, CardContent, CardHeader, Typography, Paper } from "@mui/material";

export default function aboutRiverPage() {
    return (
        <>
            <Card variant="outlined">
                <CardHeader title="River (Version 1.4)" subheader="A new project now written with a fucking React and Typescript." />
                <CardContent>
                    <Typography>
                        This project was done using React 18 right now. And it developed by Bloom. Who care about that.
                    </Typography>

                    <Alert severity="info" variant="filled" icon={<GitHub fontSize="inherit"/>}>
                        This project uses Github for open-source. You can even contribute freely
                    </Alert>
                </CardContent>
            </Card>
        </>
    )
}