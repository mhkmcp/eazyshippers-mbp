import React, { useState } from 'react';
import { Row, Col, Modal, Button} from 'react-bootstrap';
import {Dropdown, Icon} from 'rsuite';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';
import './ClientDeliveryAddress.css'



const ClientDeliveryAddress = () => {
    
    return (
        <>
        <MainContentLayout>
        <div class="d-block">
            <Row>
                <Col md={7}>
                    <h5>Delivery Address <span>ES0123456</span></h5>
                    <hr/>
                </Col>
                <Col md={5}>
                <Dropdown className="country" title="Origin Country">
                    <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                    <p>Signed in as</p>
                    <strong>foobar</strong>
                    </Dropdown.Item>
                    <Dropdown.Item divider />
                    <Dropdown.Item>Your profile</Dropdown.Item>
                    <Dropdown.Item>Your stars</Dropdown.Item>
                    <Dropdown.Item>Your Gists</Dropdown.Item>
                    <Dropdown.Item divider />
                    <Dropdown.Item>Help</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                    <hr/>
                </Col>
            </Row>
            <section className="notification">
                <Row className="bg-warning m-1 rounded d-flex justify-content-between align-items-center">
                    <Col md={1}>
                        <div className="rounded-circle bg-dark text-center">
                            <Icon icon="star" />
                        </div>
                    </Col>
                    <Col md={7}><p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, aspernatur!</small></p></Col>
                    <Col md={4}> <Button className="rounded" >Prohibited Items</Button></Col>
                </Row>
                <div className="d-flex m-1 justify-content-between">
                    <div>
                        <p><small>Copy this address and use when you make purchases in stores</small></p>
                    </div>
                    <div>
                        <p><small>How it works?</small></p>
                    </div>
                </div>

                <div className="user-details m-1">
                <table>
                    <tbody>
                        <tr className="border-bottom">
                            <td className="text-secondary">eezyShipper ID</td>
                            <td colspan="3">ES0123456</td>
                        </tr>
                        <tr>
                            <td className="text-secondary">Full Name</td>
                            <td>Imamul Hassan Khan</td>
                            <td className="text-secondary">State</td>
                            <td>Bedfordshire</td>
                        </tr>
                        <tr>
                            <td className="text-secondary">Address Line 1</td>
                            <td>Unit 3 <br/> Barrat Industrial Park Airport Way <br/>Luton Airport <br/> ES0123456</td>
                            <td className="text-secondary">City</td>
                            <td>Louton</td>
                        </tr>
                        <tr>
                            <td className="text-secondary">Address Line 2</td>
                            <td>ES0123456</td>
                            <td className="text-secondary">Postcode</td>
                            <td>LUC 3822</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="text-secondary">Phone</td>
                            <td>+8801682992668</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </section>
        </div>
        </MainContentLayout>
        </>
    );
};

export default ClientDeliveryAddress;