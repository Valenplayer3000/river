import { Face, Badge, Check, CreditCard, Info } from "@mui/icons-material"
import { Alert, Container, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"

import { Link } from "react-router-dom"

export default function SettingPage() {
    return (
        <>
            <Alert variant="outlined" severity="warning">
                This page is incomplete right now. Come back later!
            </Alert>
            <List>
                <Link to="/profile">
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Face />
                            </ListItemIcon>
                            Profile
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/about">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge />
                        </ListItemIcon>
                        Badges
                    </ListItemButton>
                </ListItem>
                </Link>
                <Link to="/verify">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Check />
                        </ListItemIcon>
                        Verification
                    </ListItemButton>
                </ListItem>
                </Link>
                <Link to="/donate">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <CreditCard />
                        </ListItemIcon>
                        Donate River
                    </ListItemButton>
                </ListItem>
                </Link>
                <Link to="/about">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        About River
                    </ListItemButton>
                </ListItem>
                </Link>
            </List>
        </>
    )
}