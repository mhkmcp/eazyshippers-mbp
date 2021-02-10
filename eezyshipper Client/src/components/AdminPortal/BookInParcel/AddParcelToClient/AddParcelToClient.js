import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const AddParcelToClient = ({selectedUser}) => {
    console.log(selectedUser);
    return (
        <Row>
            <Col md={8}>
                <MainContentLayout title="Book In Parcel">
                    <table>
                        <tbody>
                            <tr>
                                <td>ES Number</td>
                                <td>
                                    <input type="text" defaultValue={selectedUser?.id} readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <td>Customer Name</td>
                                <td>
                                    <input type="text" defaultValue={selectedUser?.customerFullName} readOnly/>
                                </td>
                                <td>Location</td>
                                <td>
                                    <input type="text" defaultValue={`${selectedUser?.customerCity} warehouse`} readOnly/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </MainContentLayout>
            </Col>
        </Row>
    );
};

export default AddParcelToClient;