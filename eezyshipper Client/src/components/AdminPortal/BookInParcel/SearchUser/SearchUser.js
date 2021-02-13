import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const SearchUser = ({setSeletedUser}) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        history.push(`/dashboard/bookInParcel/${data.esNumber}`);
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
            </Col>
        </Row>
    );
};

export default SearchUser;