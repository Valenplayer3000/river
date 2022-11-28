import * as React from "react";
import { supabase } from "../lib/supabase";

import { Card, Spin, Row, Col, Result, Typography } from "antd"

import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom"
import BadgesComponent from "./BadgesComponent";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

export default function PostComponent() {
    // Get content, author from the database
    const [postdata, setPostData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<Boolean>(true);
    const [error, setError] = React.useState<string>("");

    async function getPosts() {
        try {
            setLoading(true);

            // Thanks @stationarystation for this contribution
            const { data, status, error } = await supabase
                .from("Posts")
                .select(
                    "id, content, profiles ( username, creator, verified, donator, moderator, dev, furry)"
                )
                .order("id", { ascending: false });

            if (error && status !== 406) {
                throw error;
            }
            // Thanks @stationarystation for this contribution x2
            if (data) setPostData(data);
        } catch (e: string | any) {
            setError("Unable to connect the database...");
            console.error(e.message || e.error_message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getPosts()
    },
        []);
    return (
        <>
            <div className="card-on">
                {loading ? (
                    <>
                        <Spin style={{alignItems: 'center', justifyContent: 'center'}} size="large" />
                    </>
                ) : (
                    <>
                        <Row gutter={[6, 6]}>
                                {postdata.map((item: any) => (
                                    <>
                                        <Col span={24}>
                                                <Card key={item.id} title={item.profiles.username} style={{ wordWrap: "break-word" }}>
                                                    {item.profiles.creator && <BadgesComponent isCreator />}
                                                    {item.profiles.verified && <BadgesComponent isVerified />}
                                                    {item.profiles.moderator && <BadgesComponent isMod />}
                                                    {item.profiles.dev && <BadgesComponent isDev />}
                                                    {item.profiles.donator && <BadgesComponent isDonator />}
                                                    {item.profiles.banned && <BadgesComponent isBanned />}
                                                    {item.profiles.furry && <BadgesComponent isFurry />}
                                                    <ReactMarkdown>
                                                        {item.content}
                                                    </ReactMarkdown>
                                                </Card>
                                        </Col>
                                    </>
                                ))}
                        </Row>
                    </>
                )}
                {error ? (
                    <>
                        <Result title="Something wrong when reaching the database" extra={<div>{error}</div>} status="error" />
                    </>
                ) : null}
            </div>
        </>
    );
}