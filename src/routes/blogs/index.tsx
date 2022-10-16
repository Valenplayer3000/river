import {Box, Card, CardContent, CardHeader, Container, Typography} from "@mui/material"
import jsonblog from "./index.json"
import ReactMarkdown from "react-markdown"

export default function BlogsPage() {
    return (
        <>
            <Container>
                <Box>
                    <Typography variant="h4" component="h1">
                        River Blog
                    </Typography>
                    <Typography variant="caption" component="h4">
                        Your daily newspaper for no reason. Why not?
                    </Typography>
                    {jsonblog.map(e => (
                        <>
                            <Card variant="outlined" sx={{m:2}}>
                                <CardHeader title={e.title} subheader={e.subheader} />
                                <CardContent>
                                    <ReactMarkdown>
                                        {e.description}
                                    </ReactMarkdown>
                                </CardContent>
                            </Card>
                        </>
                    ))}
                </Box>
            </Container>
        </>
    )
}