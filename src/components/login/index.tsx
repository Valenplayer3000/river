import * as React from "react"

import { supabase } from "../../lib/supabase"

import {
  TextField,
  Button,
  FormGroup,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { Login } from "@mui/icons-material";

export default function LoginPage() {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [succes, setSucces] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSucces(false)
      setError("");
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      console.log("Logging in...");
      if (error) {
        setError(error.message);
        throw error;
      }
    } catch (error) {
      // @ts-ignore
      setError(error.error_description || error.message);
      // @ts-ignore
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
      setSucces(true);
    }
  };

  return (
    <>
      <Box sx={{ m: 3 }}>
        <Container fixed>
          <form onSubmit={handleLogin}>
            <FormGroup>
              {succes ? (
                <Alert sx={{m:1}} severity="success">
                  Successfully Logged in
                </Alert>
              ) : null}
              <TextField type="email" onChange={(e) => setEmail(e.target.value)} required sx={{ m: 1 }} fullWidth label="Email" />
              <TextField type="password" sx={{ m: 1 }} fullWidth label="Password" onChange={(e) => setPassword(e.target.value)} required />
              <Button variant="contained" sx={{ m: 1 }} type="submit" startIcon={<Login />}>Login</Button>
            </FormGroup>
          </form>
        </Container>
      </Box>
    </>
  )
}