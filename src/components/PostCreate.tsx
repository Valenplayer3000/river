import * as React from "react"
import { supabase } from "../lib/supabase"

import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Alert,
    DialogContent,
    Button,
    Fab,
} from "@mui/material"

import AddBox from "@mui/icons-material/AddBox";

import { Close, Send } from "@mui/icons-material";


export default function PostCreate() {
    const [session, setSession]: any = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true)
    }


    React.useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])

    const [name, setName] = React.useState<string>("Unknow")
    const [loading, setLoading] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [userID, setUserID] = React.useState<string | undefined>(undefined)

    const ContentChange = (e: any) => {
        if (e.target.value.length === 250) {
            window.alert("You have weached the chawactew wimit!")
        }

        else {
            setContent(e.target.value)
        }
    }

    const getUsername = async () => {
        try {
            setLoading(true);
            setError("")

            const user: any = supabase.auth.user();
            const { data, status, error } = await supabase
                .from("profiles")
                .select("username, banned")
                .eq("id", user.id)
                .single()

            if (error && status !== 406) {
                throw error;
            }

            if (data) return data;

        }

        catch (e: string | any) {
            setError("Faiwed to fetch usewname!")
            console.error(e.message || e.error_message);
        }

        finally {
            setLoading(false);
        }
    }

    const SendContent = async (e: any) => {
        e.preventDefault();

        if (!e) throw "Something wwong while sending a post to database"

        if (name === null) throw "Something wwong when sending a post: null";

        try {
            setLoading(true);

            const update = {
                name,
                content,
                user_id: userID,
            }

            let { error } = await supabase
                .from("Posts")
                .upsert(update, { returning: "minimal" })

            if (error) {
                throw error;
            }
        }

        catch (error: any) {
            setError(error.message);
        }

        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getUsername().then((user) => {
            setUserID(user.id);
            setName(user.name);
        });
    }, [session])

    return (
        <>
            <Fab color="primary" variant="extended" onClick={handleDialogOpen} sx={{ position: 'fixed', bottom: 14, right: 14 }}>
                <AddBox />
                New Post
            </Fab>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>New Post</DialogTitle>
                {loading ? (<CircularProgress />) : (
                    <>
                        <DialogContent>
                            {!session ? (
                                <>
                                    <Alert severity="error">You need to login in order to send a post!</Alert>
                                    <code>{error}</code>
                                </>
                            ) : (
                                <>
                                    <form onSubmit={SendContent}>
                                        <TextField value={content || ""} onChange={(e) => ContentChange(e)} placeholder="Write your own text/sentence" multiline fullWidth/>
                                        <DialogActions>
                                            <Button startIcon={<Close />} onClick={handleDialogClose}>
                                                Close
                                            </Button>
                                            <Button startIcon={<Send />} type="submit">
                                                Send Post
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </>
                            )}

                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    )
}