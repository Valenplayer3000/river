import * as React from "react"
import { supabase } from "../lib/supabase"

import { Modal, Input, FloatButton } from 'antd'

import { PlusOutlined } from "@ant-design/icons/";

const { TextArea } = Input;

export default function NewPostComponent() {
    const [session, setSession]: any = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const [name, setName] = React.useState<string>("Unknow")
    const [loading, setLoading] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [userID, setUserID] = React.useState<string | undefined>(undefined)

    const ContentChange = (e: any) => {
        if (e.target.value.length === 1500) {
            window.alert("You have weached the chawactew wimit!")
        } else {
            setContent(e.target.value)
        }
    }

    const getUsername = async () => {
        try {
            setLoading(true);
            setError("")

            const user: any = supabase.auth.user();
            const { data, status, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .single()

            if (error && status !== 406) {
                throw error;
            }

            setName(data.username);
            setUserID(user.id);

        } catch (e: string | any) {
            setError("Faiwed to fetch usewname!")
            console.error(e.message || e.error_message);
        } finally {
            setLoading(false);

        }
    }

    const SendContent = async (e: any) => {
        e.preventDefault();

        if (!e) throw "Expected something to comment.";
        if (name === null) throw "Error when sending post.";
        try {
            setLoading(true);

            const updates = {
                name,
                content,
                user_id: userID,
            };

            let { error } = await supabase.from("Posts").upsert(updates, {
                returning: "minimal",
            });

            if (error) {
                throw error;
            }
        } catch (error: any) {
            alert(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        getUsername()
    }, [session])

    return (
        <>

            {!session ? (
                <>
                    <FloatButton icon={<PlusOutlined />} tooltip="New Post" />
                </>
            ) : (
                <>
                    <FloatButton icon={<PlusOutlined />} tooltip="New Post" type="primary" onClick={handleDialogOpen} />
                </>
            )}

            <Modal title="New Post" open={dialogOpen} okText="Send" onOk={SendContent} onCancel={handleDialogClose} confirmLoading={loading}>
                <>
                    <TextArea style={{marginBottom: 30}} maxLength={1500} showCount autoSize rows={10} value={content || ""} onChange={(e) => ContentChange(e)} placeholder="Write your own text/sentence" />
                </>
            </Modal>
        </>
    )
}