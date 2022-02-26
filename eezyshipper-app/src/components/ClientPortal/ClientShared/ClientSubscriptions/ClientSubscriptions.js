import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';
import basicSubscriptionImage from '../../../../images/basic-subscription.png';
import proSubscriptionImage from '../../../../images/pro-subscription.png';

const ClientSubscriptions = () => {
    return (
        <>
            <MainContentLayout title="Subscriptions">
                <Row className="rounded m-3 mb-3" style={{backgroundColor : '#C1F2C2'}}>
                    <Col md={3}>
                        <img width={70} src={basicSubscriptionImage} alt=""/>
                    </Col>
                    <Col md={9}>
                        <h6>Basic</h6>
                        <p>Current Plan</p>
                    </Col>
                </Row>
                <Row className="rounded m-3" style={{backgroundColor : '#F2F2F2'}}>
                    <Col md={3}>
                    <img width={70} src={proSubscriptionImage} alt=""/>
                    </Col>
                    <Col md={9}>
                        <h6>Premium</h6>
                        <p>Update to 30% discount</p>
                    </Col>
                </Row>
            </MainContentLayout>
        </>
    );
};

export default ClientSubscriptions;