import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';

const ClientPayments = () => {
    return (
        <>
            <Row>
                <Col md={8}>
                    <MainContentLayout title="Payments">
                        <h6 className="text-secondary">Currently No Payment card Available</h6>
                        <Button className="rounded py-1 px-4 font-weight-bold mt-2" variant="primary">Add Card</Button> <br/> <br/> <br/>

                        <Form className="mt-5 w-50 m-auto pb-5">
                            <h4>Add Card</h4>
                            
                            <Form.Group controlId="formGridCardType">
                                <Form.Control placeholder="Card Type" />
                            </Form.Group>

                            <Form.Group controlId="formGridCardNumber">
                                <Form.Control placeholder="Card Number" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDate">
                                <Form.Control type="text" placeholder="MM/YY" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCvc">
                                <Form.Control type="text" placeholder="CVC" />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary btn-block" type="submit">
                                Save
                            </Button>
                        </Form>
                    </MainContentLayout>
                </Col>
            </Row>
        </>
    );
};

export default ClientPayments;