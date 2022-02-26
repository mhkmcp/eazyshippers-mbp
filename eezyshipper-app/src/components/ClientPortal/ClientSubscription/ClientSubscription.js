import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';
import IdentificationDocuments from './IdentificationDocuments/IdentificationDocuments';
import SubscriptionCard from './SubscriptionCard';

const ClientSubscription = () => {
    return (
        <>
        <Row>
            <Col md={8}>
                <MainContentLayout title="Subscriptions">
                    <p>Our subscription plans let you choose between free membership, with free international addresses and <br/> standard, pay-by-weight shipping, and paying a small monthly subscription to receive a 30% discount on our <br/> standard shipping fees. <br/> <br/>

                    Whichever plan you choose, shipping rates are based on the actual weight of your items, and charged per 100 <br/> grams, so you won't pay through the nose for shipping large-sized, lightweight packages</p> <br/> <br/> <br/> 

                    <h4>Plans</h4>
                    <hr/>
                    <SubscriptionCard></SubscriptionCard>
                </MainContentLayout>
                <IdentificationDocuments></IdentificationDocuments>
            </Col>
        </Row>
            
        </>
    );
};

export default ClientSubscription;