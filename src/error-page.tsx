import { useRouteError } from "react-router-dom";

import { Box, Card, CardHeader, Container } from "@mui/material"

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
    <>    
        <Container className="card-on">
            <Box>
                <Card>
                    <CardHeader title="Error" subheader="Something wwong whiwe twying to weach @~@" />
                </Card>
            </Box>
        </Container>
    </>
    )
}