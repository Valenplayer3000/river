import * as React from "react";
import { Link } from "react-router-dom"

import LoginPage from "./login/index"

import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    ListItemIcon,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    Typography,
} from "@mui/material";

import {
    Feed,
    Login,
    Logout,
    AccountCircle,
    PersonAdd,
    Settings,
    Article,
    Explore,
} from "@mui/icons-material";

import { supabase } from "../lib/supabase";

export default function Navbar() {
    const [settingsDialog, setSettingDialog] = React.useState(false)
    const [loginSignDialog, setLoginSignDialog] = React.useState(false)

    const handleLoginSignDialogOpen = () => {
        setLoginSignDialog(true)
        setMenuAnchor(null)
    }

    const handleLoginSignDialogClose = () => {
        setLoginSignDialog(false)
    }

    const [MenuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const MenuOpen = Boolean(MenuAnchor);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setMenuAnchor(null);
    }

    const [session, setSession] = React.useState<any>(null);

    React.useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        }
        )
    },

        []
    )

    return (
        <>
            <Dialog maxWidth="md" open={loginSignDialog} onClose={handleLoginSignDialogClose}>
                <DialogTitle>Login/Sign Up</DialogTitle>
                <DialogContent>
                    <LoginPage />
                </DialogContent>
                <DialogActions>
                    <Typography>You don't have account?</Typography>
                    <Link to="/signup" className="noborder">
                        <Button sx={{ m: 1 }} startIcon={<PersonAdd />} onClick={handleLoginSignDialogClose}>Create new Account</Button>
                    </Link>
                </DialogActions>
            </Dialog>
            <AppBar elevation={0}>
                <Toolbar>
                    <Menu id="main" anchorEl={MenuAnchor} open={MenuOpen} onClose={handleClose}>
                        {!session ? (
                            <>
                                <MenuItem disabled={true} onClick={handleClose}>
                                    <ListItemIcon>
                                        <Explore fontSize="small" />
                                    </ListItemIcon>
                                    Discover (Experimental)
                                </MenuItem>
                                <MenuItem onClick={handleLoginSignDialogOpen}>
                                    <ListItemIcon>
                                        <Login fontSize="small" />
                                    </ListItemIcon>
                                    Login
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <Link to="/discover">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Explore fontSize="small" />
                                        </ListItemIcon>
                                        Discover  (Experimental)
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={() => supabase.auth.signOut()}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link className="white" to="/">
                            River
                        </Link>
                    </Box>
                    <Link className="white" to="/post">
                        <IconButton color="inherit">
                            <Feed />
                        </IconButton>
                    </Link>
                    <IconButton onClick={handleOpen} color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <IconButton href="#" color="inherit">
                        <Article fontSize="small" />
                    </IconButton>
                    <Link className="white" to="/setting">
                        <IconButton color="inherit">
                            <Settings fontSize="small" />
                        </IconButton>
                    </Link>

                </Toolbar>
            </AppBar>
        </>
    )

}