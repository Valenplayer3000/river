import * as React from "react"

import { supabase } from "../lib/supabase"

import { Input, Button, Result } from "antd"

export default function LoginComponent() {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [succes, setSucces] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            setSucces(false);
            setErrorMessage(false);
            setError("");
            const { error } = await supabase.auth.signIn({
                email,
                password,
            });
            console.log("Logging in...");
            if (error) {
                setErrorMessage(true)
                setError(error.message);
                throw error;
            }
        } catch (error) {
            // @ts-ignore
            setError(error.error_description || error.message);
            // @ts-ignore
            console.error(error.error_description || error.message);
            setErrorMessage(true)
        } finally {
            setLoading(false);
            setSucces(true);
            setErrorMessage(false);
        }
    };

    return (
        <>
        {errorMessage ? (
            <>
                <Result title="Something wrong with our end" subTitle={error} status="error" />
            </>
        ) : (
            <>
            {succes ? (
                <Result title="Succesfully Logged In!" subTitle="You can close the modal" status="success" />
            ) : (
                <>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} required style={{ margin: 1 }} placeholder="Email" />
                    <Input type="password" style={{ margin: 1 }} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <Button style={{ margin: 1 }} onClick={handleLogin} loading={loading}>Login</Button>
                </>
            )}
            </>
        )}
        </>
    )
}