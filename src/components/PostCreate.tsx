import * as React from "react"
import {supabase} from "../lib/supabase"

import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    DialogContent,
    Button,
    Fab,
} from "@mui/material"

import AddBox from "@mui/icons-material/AddBox";

import {Close, Send} from "@mui/icons-material";


export default function PostCreate() {
    const [session, setSession]: any = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const [name, setName] = React.useState<string>("Unknow")
    const [loading, setLoading] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [userID, setUserID] = React.useState<string | undefined>(undefined)

    const ContentChange = (e: any) => {
        if (e.target.value.length === 1500) {
            window.alert("You have weached the chawactew wimit!")
        } else {
            setContent(e.target.value)
        }
    }

    const getUsername = async () => {
        try {
            setLoading(true);
            setError("")

            const user: any = supabase.auth.getUser();
            const {data, status, error} = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .single()

            if (error && status !== 406) {
                throw error;
            }
            //@ts-ignore
            setName(data.username);
            setUserID(user.id);

        } catch (e: string | any) {
            setError("Faiwed to fetch usewname!")
            console.error(e.message || e.error_message);
        } finally {
            setLoading(false);
            
        }
    }

    const SendContent = async (e: any) => {
        e.preventDefault();

        if (!e) throw "Expected something to comment.";
        if (name === null) throw "Error when sending post.";
        try {
            setLoading(true);

            const updates = {
                name,
                content,
                user_id: userID,
            };

            let {error} = await supabase.from("Posts").upsert(updates, {
                returning: "minimal",
            });

            if (error) {
                throw error;
            }
        } catch (error: any) {
            alert(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        setSession(supabase.auth.getSession());

        supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setSession(session);
        })

        getUsername()
    }, [session])

    return (
        <>

            {!session ? (
                <>
                    <Fab disabled onClick={handleDialogOpen}
                         sx={{position: 'fixed', bottom: 14, right: 14}}>
                        <AddBox/>
                    </Fab>
                </>
            ) : (
                <>
                    <Fab color="secondary" variant="extended" onClick={handleDialogOpen}
                         sx={{position: 'fixed', bottom: 14, right: 14}}>
                        <AddBox />
                        New Post
                    </Fab>
                </>
            )}

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>New Post</DialogTitle>
                {loading ? (<CircularProgress/>) : (
                    <>
                        <DialogContent>
                            <form onSubmit={SendContent}>
                                <TextField value={content || ""} onChange={(e) => ContentChange(e)}
                                           placeholder="Write your own text/sentence" multiline fullWidth/>
                                <DialogActions>
                                    <Button startIcon={<Close/>} onClick={handleDialogClose}>
                                        Close
                                    </Button>
                                    <Button startIcon={<Send/>} type="submit">
                                        Send Post
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    )
}