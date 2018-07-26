/* Importing the node modules, child components, services and controllers used 
   inside IntranetHome component */
import React from 'react';
import { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
import Servicecalls from './Servicecalls';


var httpRequest = new Servicecalls();
/* IntranetHome Component initialization */
class LoginForm extends Component {
    /* Initializing objects of its IntranetHome class */
    

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            status: '',
            errors: {

            },
            userInfo: ''
        }
    }

    componentDidMount() {
        //console.log("testt");
        $("#email").focus();

        const loginData = localStorage.getItem('loginData');
        if((loginData == undefined || loginData == null)){
            
        }else{
            var parsedData = JSON.parse(loginData);
            //console.log(parsedData);
            var str = parsedData[0].hobbies;
            var str_array = str.split(',');
            parsedData[0].hobbies = str_array;

            this.setState({status:'Success',userInfo:parsedData});            
        }     
    }

    logOut() {
        localStorage.clear();
        this.setState({userInfo:'',status:'', email:'', password:''});
        //location.href = '/loginForm'
    }

    async LoginHere() {
        var err = [];
        if (this.state.email == "") {
            err['email'] = "Email cannot be empty";
        } else if (this.state.email != "") {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.email) == false) {
                err['email'] = "Invalid Email address format";
            }
        }

        if (this.state.password == "") {
            err['password'] = "Password cannot be empty";
        } else if (this.state.password != "") {
            if (this.state.password.length < 6) {
                err['password'] = "Password should be atleast 6 characters";
            }
        }


        if (Object.keys(err).length > 0) {
            this.setState({ errors: err });
        } else {
            const data = {
                "email": this.state.email,
                "password": this.state.password
            }
            // const userInfo = _.concat(this.state.userInfo, data);
            // this.setState({ userInfo });
            //data = JSON.stringify(data);

            const response = await httpRequest.requestPostWithURLEncoded("http://localhost/practise/login.php", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            //console.log(response.status);

            if (response.status == 'Success') {
                var strdata = JSON.stringify(response.data);
                //console.log(strdata,"Stringified Data");
                localStorage.setItem('loginData', strdata);
                
                var str = response.data[0].hobbies;
                var str_array = str.split(',');
                response.data[0].hobbies = str_array;

                this.setState({userInfo:response.data});
                this.setState({ status: 'Success' });
                $(".errorTextBox").fadeIn("slow");
                setTimeout(function () { $(".errorTextBox").fadeOut("slow"); }, 3000);
            } else {
                this.setState({ status: 'Invalid username/password. Please enter valid details.' });
                this.setState({ 'email': '', 'password': '' });
                
                localStorage.clear();

                $(".errorTextBox").fadeIn("slow");
                setTimeout(function () { $(".errorTextBox").fadeOut("slow"); }, 3000);
            }

        }
    }


    setValue(field, e) {
        //console.log(field,"Field",e,"Event");
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }

    render() {
        //console.log(this.state.userInfo,"UInfo");
        return (
            <div>
                <div className="errorTextBox">
                    
                </div>
                <div className="regContainer">
                    <div className="errorTextBox">
                        { this.state.status != '' ? this.state.status : '' }
                    </div>
                    { this.state.status != 'Success' ? <h2>Login form</h2> : '' }
                    
                    { this.state.status == 'Success' ?
                    <div className="regInnCont" style={{ border: '0px' }}>
                        <a className="btn btn-danger pull-right" onClick={this.logOut.bind(this)}>Logout</a>
                        <h4>Hi {this.state.userInfo[0].first_name+' '+this.state.userInfo[0].last_name}, You have successfully logged in.<br/><br/><br/><br/> </h4>

                        
                        

                        <div className="fields">
                            <div className="fieldname">UserName / Email :</div>
                            <div className="prof">{this.state.userInfo[0].email}</div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Password :</div>
                            <div className="prof">{this.state.userInfo[0].password}</div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Name :</div>
                            <div className="prof">{this.state.userInfo[0].first_name+' '+this.state.userInfo[0].last_name}</div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Gender :</div>
                            <div className="prof">{this.state.userInfo[0].gender}</div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">City :</div>
                            <div className="prof">{this.state.userInfo[0].city}</div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Phone :</div>
                            <div className="prof">{this.state.userInfo[0].phone}</div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Hobbies :</div>
                            <div className="prof">
                                <ul>
                            {this.state.userInfo[0].hobbies.length > 0 ? this.state.userInfo[0].hobbies.map((hob,x) => <li key={x}>
                                {hob}
                            </li>) : ''}
                                </ul>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">About :</div>
                            <div className="prof">{this.state.userInfo[0].about}</div>
                        </div>

                        


                    </div>
                    :
                    <div className="regInnCont" style={{ border: '0px' }}>
                        <div className="fields">
                            <div className="fieldname">UserName / Email :</div>
                            <div className="fieldvalue">
                                <input type="email" id="email" onChange={this.setValue.bind(this, 'email')} value={this.state.email} />
                                {Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.email}</p> : ''}
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'password')} value={this.state.password} />
                                {Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.password}</p> : ''}
                            </div>
                        </div>
                        <div className="fields text-center">
                            <button className="submitbtn" onClick={this.LoginHere.bind(this)} type="button">Submit</button>
                        </div>
                    </div>
                    }


                </div>

            </div>
        );
    }
}

export default LoginForm;
