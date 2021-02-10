import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { fakeCustomerList } from '../../../../fakeData/fakeCustomer';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';
import AddParcelToClient from '../AddParcelToClient/AddParcelToClient';

const SearchUser = ({setSeletedUser}) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        e.preventDefault();
        const fakeUser = [...fakeCustomerList];
        const [selectedUser] = fakeUser.filter(user => user.id === data.esNumber);
        setSeletedUser(selectedUser);
    }
    return (
        <Row>
            <Col md={6}>
                <MainContentLayout title="Book In Parcel">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="d-block w-100">
                            <tbody>
                                <tr className="align-items-center">
                                    <td><label for="esNumber">ES Number</label></td>
                                    <td>
                                        <input type="text" name="esNumber" ref={register({ required: true})} placeholder="Enter ES"/>
                                        {errors?.esNumber && <span className="text-danger">This field is required</span>}
                                    </td>
                                    <td>
                                        <input className="btn bg-primary btn-block my-2 text-light rounded-pill font-weight-bold mt-4" type="submit" value="Find" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </form>
                </MainContentLayout>
                <AddParcelToClient></AddParcelToClient>
            </Col>
        </Row>
    );
};

export default SearchUser;