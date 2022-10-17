import * as React from "react"
import {supabase} from "../../lib/supabase"
import {CircularProgress, Button, Container, FormGroup, Stack, TextField, Typography, Alert} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";


export default function Singup() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmPass, setConfirmPass] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")
    const [message, setMessage] = React.useState<string>("")

    const handleSignup = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true)
            setError("")

            if (password !== confirmPass) {
                setError("Your password doesn't match your confirmed password")
                setLoading(false)

                return
            }

            else {
                const {error} = await supabase.auth.signUp({
                    email,
                    password,
                })

                if (error) {
                    setError(error.message)
                    throw error
                }
            }
        }

        catch (error) {
            //@ts-ignore
            setError(error.error_description || error.message)
        }

        finally {
            setMessage("A confirmation email was been sent on your email. Check your email")
        }
    }
    return(
        <>
            <Container maxWidth="md" className="card-on">
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <form onSubmit={handleSignup}>
                        <Stack sx={{witdh: '100%'}} spacing={2}>
                            <FormGroup>
                                <TextField type="email" required onChange={(e) => setEmail(e.target.value)} label="Email" />
                            </FormGroup>
                            <FormGroup>
                                <TextField required onChange={(e) => setPassword(e.target.value)} label="Password" />
                            </FormGroup>
                            <FormGroup>
                                <TextField required onChange={(e) => setConfirmPass(e.target.value)} label="Confirm Password" />
                            </FormGroup>
                            <Typography><b>*</b> = Required</Typography>
                            <Alert variant="outlined" severity="info">You must change your username after you comfirm your email</Alert>
                            <Button type="submit" variant="contained" startIcon={<PersonAdd/>}>Create</Button>
                        </Stack>
                    </form>
                )}
            </Container>
        </>
    )
}