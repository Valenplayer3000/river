import { AccountBox, Info } from "@mui/icons-material"
import { Alert, Container, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"

import { Link } from "react-router-dom"

export default function SettingPage() {
    return (
        <>
            <Alert severity="warning">
                This page is incomplete right now. Come back later!
            </Alert>
            <List>
                <Link to="/profile">
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            Profile
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        About River
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}