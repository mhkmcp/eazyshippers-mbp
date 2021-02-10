import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import basicSubscriptionImage from '../../../images/basic-subscription.png';
import proSubscriptionImage from '../../../images/pro-subscription.png';
import './SubscriptionCard.css'

const SubscriptionCard = () => {
    return (
        <>
           <div className="d-flex justify-content-between">
            <Card style={{ width: '18rem' }}>
                <Card.Img className="subscription-image" variant="top" src={basicSubscriptionImage} />
                <Card.Body>
                    <Card.Title className="text-center ">Basic <span className="text-secondary"> - Free Plan</span></Card.Title>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Text>Paid Yearly</Card.Text>
                    <Card.Title>Free</Card.Title>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img  className="subscription-image" variant="top" src={proSubscriptionImage} />
                <Card.Body>
                    <Card.Title className="text-center ">Premium <span className="text-secondary"> - Paid Plan</span></Card.Title>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Text>Paid Yearly</Card.Text>
                    <Card.Title>Free</Card.Title>
                </Card.Body>
            </Card>
        </div> 
        </>
    );
};

export default SubscriptionCard;