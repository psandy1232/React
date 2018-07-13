/* Importing the node modules, child components, services and controllers used 
   inside IntranetHome component */
import React from 'react';
import { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
/* IntranetHome Component initialization */
class RegForm extends Component {
    /* Initializing objects of its IntranetHome class */
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            cpassword:'',
            firstname:'',
            lastname:'',
            gender:'',
            phone:'',
            city:'',
            hobbies:'',
            about:'',
            errors : {

            }
        }
    }

    componentDidMount() {
        //console.log("testt");
        $("#email").focus();
    }
    setValue(field, e) {
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }
    sendValues(){
        var err ={}
        if(this.state.email == ""){
            err['email']= "Email cannot be empty";
        }else if(this.state.email != ""){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            //var address = document.getElementById[email].value;
            if (reg.test(this.state.email) == false) 
            {
                err['email']= "Invalid Email address format";                
            }
        }

        if(this.state.password == ""){
            err['password'] = "Password cannot be empty";
        }else if(this.state.password != ""){
            if(this.state.password.length < 6){
                err['password'] = "Password should be atleast 6 characters";
            }
        }

        if(this.state.cpassword == ""){
            err['cpassword'] = "Please confirm password";
        }else if(this.state.cpassword != ""){
            if(this.state.cpassword.length < 6){
                err['cpassword'] = "Password should be atleast 6 characters";
            }
        }

        if(this.state.password != this.state.cpassword){
            err['cpassword'] = "Password and Confirm password should be same";
        }
        if(this.state.firstname == ""){
            err['firstname'] = "Please enter firstname";
        }  
        if(this.state.lastname == ""){
            err['lastname'] = "Please enter lastname";
        }
        if(this.state.phone == ""){
            err['phone'] = "Please enter phonenumber";
        } else if(this.state.phone != ""){
            if(this.state.phone.length != 10){
                err['phone'] = "Phone number should be 10 digit number";
            }
        } 
        if(this.state.city == ""){
            err['city'] = "Please enter city";
        } 
        if(this.state.about == ""){
            err['about'] = "Please enter about";
        }    


        this.setState({errors:err});
    }

    /* It is invoked to return html content */
    render() {
        console.log(this.state.errors,"Errors");
        return (
            <div>
                <div className="regContainer">

                    <h2>Registration Page</h2>
                    <div className="regInnCont">
                        <div className="fields">
                            <div className="fieldname">UserName / Email :</div>
                            <div className="fieldvalue">
                                <input type="email" id="email" onChange={this.setValue.bind(this, 'email')} value={this.state.email} />
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.email}</p>: '' }
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'password')} value={this.state.password} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.password}</p>: '' }
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Confirm Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'cpassword')} value={this.state.cpassword} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.cpassword}</p>: '' }
                            </div>
                        </div>

                    </div>

                    <div className="regInnCont">


                        <div className="fields half">
                            <div className="fieldname">First Name :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'firstname')} value={this.state.firstname} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.firstname}</p>: '' }
                            </div>
                        </div>

                        <div className="fields half fright">
                            <div className="fieldname">LastName :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'lastname')} value={this.state.lastname} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.lastname}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Gender :</div>
                            <div className="fieldvalue">
                                <p><input type="radio" value="Male" onClick={this.setValue.bind(this, 'gender')} value={this.state.gender} /> Male </p>
                                <p><input type="radio" value="Female" onClick={this.setValue.bind(this, 'gender')} value={this.state.gender} /> Female </p>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Phone Number :</div>
                            <div className="fieldvalue"><input type="number" onChange={this.setValue.bind(this, 'phone')} value={this.state.phone} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.phone}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">City :</div>
                            <div className="fieldvalue">
                                <select onChange={this.setValue.bind(this, 'city')} value={this.state.city}>
                                    <option value="">-- Select City --</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Secunderabad">Secunderabad</option>
                                </select>
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.city}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Hobbies : </div>
                            <div className="fieldvalue">
                                <p><input type="checkbox" onChange={this.setValue.bind(this, 'hobbies')} value={this.state.hobbies} /> Reading novels </p>
                                <p><input type="checkbox" onChange={this.setValue.bind(this, 'hobbies')} value={this.state.hobbies} /> Playing Cricket </p>
                                <p><input type="checkbox" onChange={this.setValue.bind(this, 'hobbies')} value={this.state.hobbies} /> Listening Music </p>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">About : </div>
                            <div className="fieldvalue">
                                <textarea onChange={this.setValue.bind(this, 'about')} value={this.state.about}></textarea>
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.about}</p>: '' }
                            </div>
                        </div>

                        <div className="fields text-center">
                            <button className="submitbtn" onClick={this.sendValues.bind(this)} type="button">Submit</button>
                        </div>
                    </div>


                </div>

            </div>
        );
    }
}

export default RegForm;
