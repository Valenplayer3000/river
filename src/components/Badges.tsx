import * as React from "react";
import {Chip, Stack} from "@mui/material";

interface badges {
    isCreator?: any;
    isDev?: any;
    isVerified?: any;
    isDonator?: any;
    isMod?: any;
    isBanned?: any;
}

export default function Badges({ isCreator, isDev, isVerified, isDonator, isMod, isBanned} : badges){
    return (
        <>
            <Stack direction="row" spacing={2}>

                {isCreator && (<Chip color="secondary" size="small" label="Creator"/>)}

                {isDev && (<Chip color="secondary" size="small" label="Dev"/>)}
                
                {isMod && (<Chip color="secondary" size="small" label="Moderator"/>)}
                
                {isDonator && (<Chip color="secondary" size="small" label="Donator"/>)}
                
                {isVerified && (<Chip color="secondary" size="small" label="Verified"/>)}

                {isBanned && (<Chip color="error" size="small" label="Banned"/>)}

            </Stack>
        </>
    )
}