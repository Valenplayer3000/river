import { Collapse } from 'antd'
import { InfoCircleOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';

import AboutComponent from './AboutComponent'
import DonationComponent from './DonationComponent';
import VerificationComponent from './VerificationComponent';

const { Panel } = Collapse;

export default function Setting() {

    return (
        <>
            <Collapse>  
                <Panel extra={<CreditCardOutlined/>} header="Donation" key="1">
                    <DonationComponent />
                </Panel>
                <Panel extra={<CheckOutlined/>} header="Verification" key="2">
                    <VerificationComponent />
                </Panel>
                <Panel extra={<InfoCircleOutlined/>} header="About River" key="3">
                    <AboutComponent />
                </Panel>
            </Collapse>
        </>
    )
}