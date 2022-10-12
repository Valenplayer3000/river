import * as React from "react"
import Badges from "../../../components/Badges"

import { supabase } from "../../../lib/supabase"

import { Box, TextField, Button, FormGroup, Typography, Stack, Card, CardContent, Alert, } from "@mui/material"

export default function Profile() {
    const [Uservalue, setUserValue] = React.useState(0)

    const hadnleChange = (event: React.SyntheticEvent, newValue: number) => {
        setUserValue(newValue)
    }

    const [session, setSession] = React.useState<any>(null);
    const [currentUsername, setCurrentUsername] = React.useState<
        string | null | undefined
    >(null);
    const [username, setUsername] = React.useState<string>(currentUsername || "");
    const [newUsername, setNewUsername] = React.useState<string>("");
    const [website, setWebsite] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

    async function getUserData() {
        try {
            setLoading(true);
            setCurrentUsername(null);
            const user: any = supabase.auth.user();

            const { data, status, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                console.log(data?.username);
                setCurrentUsername(data?.username);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id: user?.id,
                username: newUsername,
                website,
                //   avatar_url,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                throw error;
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        getUserData();
    }, []);

    return (
        <>
            {!session ? (
                <>
                    <Alert severity="warning">You need to sign in/sign up to enter profile page</Alert>
                </>
            ) : (
                <>
                    <Box>
                        <FormGroup sx={{m:1}}>
                            <TextField
                                value={newUsername || ""}
                                placeholder="New Username"
                                onChange={(e) => {
                                    setNewUsername(e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup sx={{m:1}}>
                            <TextField
                                label="Website to show on profile"
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <Button
                            className="container-div"
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={loading}
                        >
                            Change Data
                        </Button>
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Card elevation={5} sx={{ display: 'flex' }}>
                            <CardContent>
                                <Typography variant="h5">{newUsername || currentUsername} <Stack gap={0.1} direction="row"><Badges isDev isMod isVerified isDonator /></Stack></Typography>
                                <Typography variant="body1">Hello River!</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </>
            )}
        </>
    )
}