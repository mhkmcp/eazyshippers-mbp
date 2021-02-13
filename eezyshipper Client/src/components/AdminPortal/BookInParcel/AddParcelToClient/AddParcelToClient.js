import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fakeCustomerList } from '../../../../fakeData/fakeCustomer';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const AddParcelToClient = () => {
    const {userId} = useParams();
    const [selectedUser, setSelectedUser] = useState([]);
    useEffect(() => {
        const fakeUser = [...fakeCustomerList];
        const [filteredData] = fakeUser.filter(user => user.id === userId);
        setSelectedUser(filteredData);
    }, [userId])
    console.log(userId, selectedUser);

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