import React from "react";
import MaterialIcon from 'react-material-iconic-font';

import FormLabel from 'react-bootstrap/FormLabel'

import '../content/css/style.css';
import '../content/fonts/material-icon/css/material-design-iconic-font.min.css';

import {Link} from "react-router-dom";

import signin_image from '../content/images/signin-image.jpg';

export default function NewLogin(props) {

    return (
      
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signin_image} alt=" sign in" /></figure>                  
                        <Link to="/signup">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <FormLabel for="your_name"><MaterialIcon type="account" /></FormLabel>                                                             
                                <input type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <FormLabel for="your_pass"><MaterialIcon type="lock" /></FormLabel>                                        
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
    );

}