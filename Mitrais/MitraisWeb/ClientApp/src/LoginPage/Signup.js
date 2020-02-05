import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";

import MaterialIcon from 'react-material-iconic-font';
import FormLabel from 'react-bootstrap/FormLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import '../content/css/style.css';
import '../content/fonts/material-icon/css/material-design-iconic-font.min.css';

import signup_image from '../content/images/signup-image.jpg';

import { Formik } from 'formik';
import { Field } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

  
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        // .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$','Password should at least have 1 uppercase, 1 number and 1 symbol')    
        .required('Required'),
    confirmpassword : Yup.string().required('Required').oneOf([Yup.ref('password'), null],"Password not macth"),
  });

  export class Signup extends Component {  
    static displayName = Signup.name;  

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password : '',
            confirmpassword:''
        };
            
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }

    //   handleSubmit(event) {
    //     console.log("ABC: " , this.state);
    //     event.preventDefault();       

    //     axios({
    //         url : "/api/User",
    //         data : this.state,
    //         method : "POST",            
    //     }).then(res => {
    //         console.log("Response: ", res);
    //     })

    //   }

    //   handleChange(event) {
    //     this.setState({[event.target.name] : event.target.value});
    //   }

    render(){
    return(
            <Container>
                <ToastContainer />                
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <Formik
                        enableReinitialize
                        validationSchema={SignupSchema}
                        onSubmit ={(values, actions) => {
                            axios({
                                url : "/api/User",
                                data : values,
                                method : "POST",            
                            }).then(res => {                           
                                console.log("Res: ", res);
                                toast.success("Successfully creating new user",{
                                autoClose: 2000,
                                draggable: false,                            
                                });
                                
                                // this.props.history.push('/');                                                                                                  
                            }).catch(error => {                                
                                toast.error("Failed creating new user",{
                                    autoClose: 2000,
                                    draggable: false,                            
                                    });
                            });                            
                          }}                     
                        initialValues={this.state}>
                        {({ handleSubmit,handleChange,handleBlur,values,touched,isValid,errors, }) => (
                        <Form noValidate  className="register-form" id="register-form" onSubmit = {handleSubmit} >
                            <div className="form-group">
                                <FormLabel htmlFor="name"><MaterialIcon type="home" /></FormLabel>                             
                                <Field type="text" name="name" id="name" placeholder="Your Name" onChange={handleChange} />                                
                                {errors.name && touched.name ? (<div style= {{color:"red"}} >{errors.name}</div>) : null}
                            </div>
                            <div className="form-group">
                                <FormLabel htmlFor="email"><MaterialIcon type="email" /></FormLabel>                                
                                <Field type="email" name="email" id="email" placeholder="Your Email" onChange={handleChange} />
                                {errors.email && touched.email ? (<div style= {{color:"red"}} >{errors.email}</div>) : null}
                            </div>
                            <div className="form-group">                                
                                <FormLabel htmlFor="password"><MaterialIcon type="lock" /></FormLabel>
                                <Field type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                                {errors.password && touched.password ? (<div style= {{color:"red"}} >{errors.password}</div>) : null}
                            </div>
                            <div className="form-group">
                                <FormLabel htmlFor="confimpassword"><MaterialIcon type="lock-outline" /></FormLabel>                                
                                <Field type="password" name="confirmpassword" id="confirmpassword" placeholder="Repeat your password" onChange={handleChange} />
                                {errors.confirmpassword && touched.confirmpassword ? (<div style= {{color:"red"}} >{errors.confirmpassword}</div>) : null}
                            </div>
                            {/* <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />                                
                                <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in Terms of service</label>
                            </div> */}
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                       
                        </Form>
                        )}
                    </Formik>

                    </div>
                    <div className="signup-image">
                        <figure><img src={signup_image} alt="sign up" /></figure>
                        <Link to = "/">I am already member</Link>
                        <br />
                        {/* <Link to = "/fetch">Fetch Data</Link> */}
                    </div>
                </div>
            </Container>
 
        );
    }
}

