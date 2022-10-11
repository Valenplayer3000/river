import { Container } from "@mui/material"
import Post from "../components/Posts"
import CreatePost from "../components/PostCreate"


export default function PostPage() {
    return (
        <>
            <Container maxWidth="md" fixed>
                <Post />
            </Container>
            <CreatePost />
        </>
    )
}