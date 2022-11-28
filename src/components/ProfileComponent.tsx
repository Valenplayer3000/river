import * as React from "react"
import Badges from "./BadgesComponent"

import { supabase } from "../lib/supabase"

import {Input, Card, Button, Result} from 'antd'

export default function ProfileComponent() {
    const [Uservalue, setUserValue] = React.useState(0)

    const hadnleChange = (event: React.SyntheticEvent, newValue: number) => {
        setUserValue(newValue)
    }

    const [session, setSession] = React.useState<any>(null);
    const [currentUsername, setCurrentUsername] = React.useState<string | null | undefined>(null);
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
                    <Result status="warning" title="You need to sign in/sign up to enter profile page" />
                </>
            ) : (
                <>
                            <Input
                                style={{margin: 2}}
                                value={newUsername || ""}
                                placeholder="New Username"
                                onChange={(e) => {
                                    setNewUsername(e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                            <Input
                                style={{margin: 2}}
                                placeholder="Website to show on profile"
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                        <Button
                            style={{margin: 2}}
                            className="container-div"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Change Data
                        </Button>
                        <Card style={{margin: 2}} title={newUsername || currentUsername}>
                                <Badges isDev isMod isVerified isDonator isBanned isFurry />
                                {""}
                                Hello River!
                        </Card>
                </>
            )}
        </>
    )
}