import * as React from "react"
import { supabase } from "../lib/supabase"

import { Result, Button, Input, Steps } from 'antd'



export default function SingUpComponent() {

    const [loading, setLoading] = React.useState<boolean>(false)
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

            if (email !== "@") {
                setError("Not a valid email")
                setLoading(false)
            }

            else {
                const { error } = await supabase.auth.signUp({
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

    const steps = [
        {
            title: 'Email',
            content: (
                <>
                    <Input style={{margin: 5}} placeholder="Type your email" type="email" required onChange={(e) => setEmail(e.target.value)} />
                </>
            ),
        },
        {
            title: 'Password',
            content: (
                <>
                    <Input style={{margin: 5}} placeholder="Type your password" required onChange={(e) => setPassword(e.target.value)} />
                    <Input style={{margin: 5}} placeholder="Type again on your password" required onChange={(e) => setConfirmPass(e.target.value)} />
                </>
            ),
        },
        {
            title: 'Finish Setting Up',
            content: 'Please confirm your email and head to Profile and change your username as you want it. ',
        },
    ];

    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>
            <Steps style={{marginBottom: 20}} current={current} items={items} />
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button style={{margin: 5}} type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button style={{margin: 5}} type="primary" onClick={handleSignup}>
                        Create Account
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '10 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    )
}