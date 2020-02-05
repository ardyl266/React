import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";

import MaterialIcon from 'react-material-iconic-font';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel'

import '../content/css/style.css';
import '../content/fonts/material-icon/css/material-design-iconic-font.min.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



import signin_image from '../content/images/signin-image.jpg';


export default class NewLogin extends Component{

    static displayName = NewLogin.name; 

    constructor(props){
        super(props);
        this.state = {            
            email: '',
            password : ''            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        axios({
            url : "/api/Authenticate",
            data : this.state,
            method : "POST",            
        }).then(res => {                           
            console.log("Res: ", res);
            localStorage.setItem('token', 'Bearer ' + res.data.token);
            toast.success("Success",{
            autoClose: 2000,
            draggable: false,                            
            });

            console.log("Token: ", localStorage.getItem('token'));
            

            this.props.history.push('/home');                                                                                                  
        }).catch(error => {                                
            toast.error("Login Failed",{
                autoClose: 2000,
                draggable: false,                            
                });
        });   

        
    };
    handleChange(event) {
        console.log("Event Name: ", event.target.name);
        this.setState({[event.target.name] : event.target.value});
    }

    render(){
        return (
      
            <Container>
                <ToastContainer />   
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signin_image} alt=" sign in" /></figure>                  
                        <Link to="/signup">Create an account</Link>
                        <br />
                        {/* <Link to="/fetch">Fetch Data</Link> */}
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <Form noValidate  className="register-form" id="register-form" onSubmit = {this.handleSubmit} >
                            <div className="form-group">
                                <FormLabel htmlFor="email"><MaterialIcon type="account" /></FormLabel>                                                             
                                <input type="email" name="email" id="email" placeholder="Email Address" onChange ={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <FormLabel htmlFor="password"><MaterialIcon type="lock" /></FormLabel>                                        
                                <input type="password" name="password" id="password" placeholder="Password" onChange ={this.handleChange} />
                            </div>
                            {/* <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div> */}
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        
        );
    }
}