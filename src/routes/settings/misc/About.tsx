import { GitHub } from "@mui/icons-material";
import { Alert, Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function aboutRiverPage() {
    return (
        <>
            <Card variant="outlined">
                <CardHeader title="River" subheader="Version 1.9" />
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