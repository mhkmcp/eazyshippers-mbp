import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';
import './ForgetPassword.css';
import customerLogo from '../../../images/customer-logo.png';

const ForgetPassword = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        history.push('/dashboard')
    }
    return (
        <Row className="justify-content-center align-item-center my-5 text-center">
            <Col md={4}>
                <img className="login-logo" src={customerLogo} alt=""/>
                <MainContentLayout title="Reset Password">
                    <div className="forget-pass text-center">
                        <form className="register-form mt-3" onSubmit={handleSubmit(onSubmit)}> 
                            <p className="text-secondary font-weight-bold"> <small>Enter the email address associated with your account <br/> and we will send a link to reset your password</small> </p> 

                            <input className="form-control my-2 mt-5" type="email" name="email" ref={register({ required: true })} placeholder="Email"/>           
                            {errors.email && <span className="text-danger">This field is required</span>}

                            
                            <input className="btn bg-primary btn-block my-2 py-2 text-light rounded-pill font-weight-bold mt-4" type="submit" value="Send Link" />
                            
                        </form>
                    </div>
                </MainContentLayout>
            </Col>
            
        </Row>
    );
};

export default ForgetPassword;