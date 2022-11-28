import {Tag} from 'antd'

interface badges {
    isCreator?: any;
    isDev?: any;
    isVerified?: any;
    isDonator?: any;
    isMod?: any;
    isBanned?: any;
    isFurry?: any;
}

export default function BadgesComponent({ isCreator, isDev, isVerified, isDonator, isMod, isBanned, isFurry} : badges){
    return (
        <>

                {isCreator && (<Tag color="purple">Creator</Tag>)}

                {isDev && (<Tag color="lime">Dev</Tag>)}
                
                {isMod && (<Tag color="green">Moderator</Tag>)}

                {isDonator && (<Tag color="blue">Donator</Tag>)}
                
                {isVerified && (<Tag color="gold">Verified</Tag>)}

                {isBanned && (<Tag color="red">Banned</Tag>)}

                {isFurry && (<Tag color="orange">Furry</Tag>)}

        </>
    )
}