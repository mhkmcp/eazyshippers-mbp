import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import MainContentLayout from '../Layouts/MainContentLayout/MainContentLayout';
import { Col, Row, Button } from 'react-bootstrap';
import customerLogo from '../../images/customer-logo.png';

const AdminLogIn = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        history.push('/dashboard')
    }
    return (
        <Row className="justify-content-center text-center">
            <Col md={4}>
            <img width={200} className="d-block mx-auto" src={customerLogo} alt="logo"/>
            <MainContentLayout centerAll={true} title="Log In">
                <div className="p-4">
                    <form className="register-form mt-5" onSubmit={handleSubmit(onSubmit)}>              
                        <input className="form-control" type="email" name="email" ref={register({ required: true })} placeholder="Email"/>           
                        {errors.email && <span className="text-danger">This field is required</span>}

                        <input className="form-control my-2" type="password" name="password" ref={register({ required: true })} placeholder="Password"/>           
                        {errors.password && <span className="text-danger">This field is required</span>}

                        
                        <input className="btn bg-primary btn-block my-2 text-light rounded-pill font-weight-bold mt-4" type="submit" value="Log In" />
                        <p as={Link} className="text-right"> 
                        <Link to="/forget-pass">  Forget Password</Link></p>
                        <p className="mt-5"><small className="font-weight-bold mt-5">Don't Have an account??</small></p>
                        
                        <Link style={{textDecoration : 'none'}} to="/register"><Button className="btn-block rounded-pill font-weight-bold py-2" variant="outline-primary">Create Account</Button></Link>
                        
                    </form>
                </div>
            </MainContentLayout>
            </Col>
        </Row>
        
    );
};

export default AdminLogIn;