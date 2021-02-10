import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import customerLogo from '../../../images/customer-logo.png';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';
import './Register.css';
import ReCAPTCHA from "react-google-recaptcha";



const Register = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        // fetch('localhost:5000/addUser')
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     history.push('/dashboard')
        // });

        console.log(data);
    }

    function onChange(value) {
        console.log("Captcha value:", value);
    }


    return (
        <Row className="justify-content-center align-item-center my-5 text-center">
            <Col md={4}>
                <img className="login-logo" src={customerLogo} alt=""/>
                <MainContentLayout title="Create Account">
                    <div className="create-account text-center">
                        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>              
                            <input className="form-control py-2 my-3" type="text" name="userFirstName" ref={register({ required: true, maxLength: 45 })} placeholder="First Name"/>           
                            { errors?.userFirstName && errors?.userFirstName?.type === 'required' &&  <span className="text-danger">This field is required</span>}
                            { errors?.userFirstName && errors?.userFirstName?.type === 'maxLength' && <span className="text-danger">Max 45 Characters</span>}

                            <input className="form-control my-3 py-2" type="text" name="userLastName" ref={register({ required: true, maxLength: 45 })} placeholder="Last Name"/>           
                            { errors?.userLastName && errors?.userLastName?.type === 'required' &&  <span className="text-danger">This field is required</span>}
                            { errors?.userLastName && errors?.userLastName?.type === 'maxLength' && <span className="text-danger">Max 45 Characters</span>}

                            <input className="form-control my-3 py-2" type="email" name="userEmail" ref={register({ required: true })} placeholder="Email"/>           
                            {errors?.userEmail && <span className="text-danger">This field is required</span>}

                            <input className="form-control my-3 py-2" type="password" name="userPassword" ref={register({ required: true })} placeholder="Password"/>           
                            {errors?.userPassword && <span className="text-danger">This field is required</span>}

                            <select name="userCountry" ref={register({ required: true })} class="btn btn-block btn-secondary my-2 dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Srilanka">Srilanka</option>
                                <option value="Australia">Australia</option>
                                <option value="Bhutan">Bhutan</option>
                            </select>
                            {errors?.userCountry && <span className="text-danger">This field is required</span>}

                            <ReCAPTCHA style={{marginLeft : '15px', marginTop : '20px'}}
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={onChange}
                            />
                            
                            <input className="btn bg-primary btn-block my-2 text-light rounded-pill font-weight-bold mt-4 py-2" type="submit" value="Create Account" />
                            
                            <p className="text-secondary">By Clicking 'Create Account' above you accept <br/> our Terms and Services and Policy</p>

                            <p className="mt-4"><small className="font-weight-bold">Already Have an account??</small></p>
                            
                            <Link style={{textDecoration : 'none'}} to="/login"><Button className="btn-block rounded-pill font-weight-bold py-2" variant="outline-primary">Log In</Button></Link>
                            
                        </form>
                        
                    </div>
                </MainContentLayout>
            </Col>
            
        </Row>
    );
};

export default Register;