import React from 'react';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import { Nav, Icon } from 'rsuite';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';

const ClientParcels = ({ active, onSelect, ...props }) => {
    // const { active } = this.state;
    const styles = {
        marginBottom: 50
      }

    
    const handleSelect=(activeKey)=> {
        this.setState({ active: activeKey });
      }
      
    return (
        <div>
            <Row>
                <Col md={8}>
                    <MainContentLayout title="Parcels">
                        <Row>
                            <Col md={7}>
                                <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
                                    <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
                                        All
                                    </Nav.Item>
                                    <Nav.Item eventKey="news">Active</Nav.Item>
                                    <Nav.Item eventKey="solutions">History</Nav.Item>
                                   
                                </Nav>
                            </Col>
                            <Col md={4}>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search"/>
                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    
                        
                    </MainContentLayout>
                </Col>
            </Row>
        </div>
    );
};

export default ClientParcels;