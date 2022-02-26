import React from 'react';
import { Form } from 'react-bootstrap';
import { Dropdown } from 'rsuite';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const CalculateShippingCost = () => {
    return (
        <>
            <MainContentLayout title="Calculate Shipping Cost">
            <div className="p-3">
                <Dropdown style= {{border : 'none', borderBottom: '1px solid gray'}} className="country form-control my-1" title="Shipping From">
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
                <br/>
                <Dropdown style= {{border : 'none', borderBottom: '1px solid gray'}} className="country form-control my-1" title="Shipping To">
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

                <Dropdown style= {{border : 'none', borderBottom: '1px solid gray', borderRight: '1px solid gray'}} className="country  my-1" title="Weight">
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

                <Dropdown style= {{border : 'none', borderBottom: '1px solid gray', borderLeft: '1px solid gray'}} className="country pl-2 my-1" title="KG">
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

                <Form.Group controlId="formCost">
                    <Form.Label>Approx Cost</Form.Label>
                    <Form.Control style= {{border : 'none', borderBottom: '1px solid gray'}} type="email" placeholder="$50.00" />
                </Form.Group>

                <h6 className="text-center text-secondary">Pricing Based on actual package <br/> weight regardless of <br/>volume/dimensions</h6>  

                    
            </div>
            </MainContentLayout>
        </>
        
    );
};

export default CalculateShippingCost;