import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import customerLogo from '../../../images/customer-logo.png';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';
import './Register.css';
import ReCAPTCHA from "react-google-recaptcha";
import { setCurrentUser } from '../../../redux/Actions/eeztshipperActions';
import { connect } from 'react-redux';



const Register = ({currentUser, setCurrentUser}) => {
    //localize
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('http://127.0.0.1:8000/api/auth/register',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            let {data:{user}} = res;
            user.role = 'admin';
            console.log(user);
            setCurrentUser(user);
            history.replace(from);
        })
        .catch(err => {
            
        });
    }

    function onChange(value) {
        console.log("Captcha value:", value);
    }


    return (
        <Row className="justify-content-center text-center">
            <Col md={4}>
                <img width={200} className="d-block mx-auto" src={customerLogo} alt="logo"/>
                <MainContentLayout title="Create Account">
                    <div className="text-center p-4">
                        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>              
                            <input className="form-control my-3" type="text" name="users_first_name" ref={register({ required: true, maxLength: 45 })} placeholder="First Name"/>           
                            { errors?.userFirstName && errors?.users_first_name?.type === 'required' &&  <span className="text-danger">This field is required</span>}
                            { errors?.userFirstName && errors?.users_first_name?.type === 'maxLength' && <span className="text-danger">Max 45 Characters</span>}

                            <input className="form-control my-3" type="text" name="users_last_name" ref={register({ required: true, maxLength: 45 })} placeholder="Last Name"/>           
                            { errors?.users_last_name && errors?.userLastName?.type === 'required' &&  <span className="text-danger">This field is required</span>}
                            { errors?.users_last_name && errors?.userLastName?.type === 'maxLength' && <span className="text-danger">Max 45 Characters</span>}

                            <input className="form-control my-3" type="email" name="email" ref={register({ required: true })} placeholder="Email"/>           
                            {errors?.email && <span className="text-danger">This field is required</span>}

                            <input className="form-control my-3" type="password" name="password" ref={register({ required: true })} placeholder="Password"/>           
                            {errors?.password && <span className="text-danger">This field is required</span>}

                            <select name="userCountry" ref={register({ required: true })} className="btn btn-block btn-secondary my-2 dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Srilanka">Srilanka</option>
                                <option value="Australia">Australia</option>
                                <option value="Bhutan">Bhutan</option>
                            </select>
                            {errors?.userCountry && <span className="text-danger">This field is required</span>}

                            <div className="d-flex justify-content-center">
                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    onChange={onChange}
                                />
                            </div>
                            
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

const mapStateToProps = state => {
    return{
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = {
    setCurrentUser: setCurrentUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);