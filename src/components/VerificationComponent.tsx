import React from 'react'

import { Button, Card } from "antd";

export default function VerificationComponent() {

    const [changeStatus, setStatus] = React.useState(false)

    const [statusCheck, setStatusCheck] = React.useState<any>(null)

    const status = "Not Verified"

    const status1 = "Verified"

    const Verify = () => {
        setStatusCheck(true)
    }

    return (
        <>
            {statusCheck ? (
                <>
                    <Card title={"Verification Status: " + status1} extra={<Button color="green" disabled>Verified</Button>} />
                </>
            ) : (
                <>
                    <Card title={"Verification Status: " + status} extra={<Button onClick={Verify}>Verify</Button>} />
                </>
            )}

        </>
    )
}