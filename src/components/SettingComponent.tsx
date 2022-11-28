import { Collapse } from 'antd'
import AboutComponent from './AboutComponent'
import { InfoCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function Setting() {

    return (
        <>
            <Collapse>  
                <Panel extra={<InfoCircleOutlined/>} header="Donation" key="1">
                    <AboutComponent />
                </Panel>
                <Panel extra={<InfoCircleOutlined/>} header="Verification" key="2">
                    <AboutComponent />
                </Panel>
                <Panel extra={<InfoCircleOutlined/>} header="About River" key="3">
                    <AboutComponent />
                </Panel>
            </Collapse>
        </>
    )
}