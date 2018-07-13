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
            errors : []
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
        if(this.state.email == ""){
            this.state.errors['email'] = "Cannot be empty";

            console.log(this.state.errors['email']);
            $("#email").addClass("valid");
            return false;
        }

    }

    /* It is invoked to return html content */
    render() {
        return (
            <div>
                <div className="regContainer">

                    <h2>Registration Page</h2>
                    <div className="regInnCont">
                        <div className="fields">
                            <div className="fieldname">UserName / Email :</div>
                            <div className="fieldvalue">
                                {console.log(this.state.errors) }
                                <input type="email" id="email" onChange={this.setValue.bind(this, 'email')} value={this.state.email} />
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'password')} value={this.state.password} /></div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Confirm Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'cpassword')} value={this.state.cpassword} /></div>
                        </div>

                    </div>

                    <div className="regInnCont">


                        <div className="fields half">
                            <div className="fieldname">First Name :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'firstname')} value={this.state.firstname} /></div>
                        </div>

                        <div className="fields half fright">
                            <div className="fieldname">LastName :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'lastname')} value={this.state.lastname} /></div>
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
                            <div className="fieldvalue"><input type="number" onChange={this.setValue.bind(this, 'phone')} value={this.state.phone} /></div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">City :</div>
                            <div className="fieldvalue">
                                <select onChange={this.setValue.bind(this, 'city')} value={this.state.city}>
                                    <option value="">-- Select City --</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Secunderabad">Secunderabad</option>
                                </select>
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
