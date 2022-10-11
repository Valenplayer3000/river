import { AccountBox, ExpandMore } from "@mui/icons-material"
import { Alert, Container, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"

export default function SettingPage() {
    return (
        <>
            <Alert severity="warning">
                This page is incomplete right now. Come back later!
            </Alert>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        Profile
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        About River
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}