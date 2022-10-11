import * as React from "react";
import { Link } from "react-router-dom"

import SettingPage from "../settings/index"
import LoginPage from "../login/index"

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
} from "@mui/material";

import {
    Feed,
    Login,
    Logout,
    People,
    Settings,
} from "@mui/icons-material";

import { supabase } from "../lib/supabase/index";

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

    const handleSettingDialogOpen = () => {
        setSettingDialog(true)
    }

    const handleSettingDialogClose = () => {
        setSettingDialog(false)
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
            <Dialog open={settingsDialog} onClose={handleSettingDialogClose}>
                <DialogTitle>Setting</DialogTitle>
                <DialogContent>
                    <SettingPage />
                </DialogContent>
                <DialogActions>
                    <Link className="noborder" to="/setting">
                        <Button>
                            See all setting
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>

            <Dialog open={loginSignDialog} onClose={handleLoginSignDialogClose}>
                <DialogTitle>Login/Sign Up</DialogTitle>
                <DialogContent>
                    <LoginPage />
                </DialogContent>
            </Dialog>
            <AppBar>
                <Toolbar>
                    <Menu id="main" anchorEl={MenuAnchor} open={MenuOpen} onClose={handleClose}>
                        {!session ? (
                            <>
                                <MenuItem onClick={handleLoginSignDialogOpen}>
                                    <ListItemIcon>
                                        <Login fontSize="small" />
                                    </ListItemIcon>
                                    Login
                                </MenuItem>
                            </>
                        ) : (
                            <>
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
                        <People />
                    </IconButton>
                    <IconButton onClick={handleSettingDialogOpen} color="inherit">
                        <Settings fontSize="small" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )

}