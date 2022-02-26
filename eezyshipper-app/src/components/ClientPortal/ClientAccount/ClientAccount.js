import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';

const ClientAccount = () => {
    return (
        <>
            <Row>
                <Col md={8}>
             <MainContentLayout title="Accounts">
                <Form>
                    <input type="email" name="email" id="email" placeholder="Email :"/> <br/> <br/>
                    <input type="text" name="" id="" placeholder="Your Id :"/> <br/> <br/>
                    <p>Identification Documents<input type="file" id="myFile" name="filename" /></p>

                    <h5>Address</h5>
                    <hr/>
                
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group> */}
                    </Form.Row> <br/> <br/> <br/>

                    <h4>Bio</h4>
                    <hr/>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" placeholder="Gender" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridBirthDate">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="text" placeholder="Date of Birth" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridNationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control type="text" placeholder="Nationality" />
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridBirthDate">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="text" placeholder="Date of Birth" /> */}
                        {/* </Form.Group> */}
                    </Form.Row><br/> <br/> <br/>

                    <h4>Email Subscription</h4>
                    <hr/>
                </Form>
            </MainContentLayout>
            </Col>
            </Row>
        </>
    );
};

export default ClientAccount;