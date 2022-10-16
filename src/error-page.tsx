import { useRouteError } from "react-router-dom";

import { Box, Card, CardHeader, Container } from "@mui/material"

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
    <>    
        <Container className="card-on">
            <Box>
                <Card sx={{p:2}}>
                    <CardHeader title="Error" subheader="Something wwong whiwe twying to weach @~@" />
                    <code>Machine. You should fix your error NOW.</code>
                </Card>
            </Box>
        </Container>
    </>
    )
}