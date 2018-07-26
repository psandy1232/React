/* Importing the node modules, child components, services and controllers used 
   inside IntranetHome component */
import React from 'react';
import { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
/* IntranetHome Component initialization */
class SampleForm extends Component {
    /* Initializing objects of its IntranetHome class */
    constructor(props) {
        super(props)
        this.state = {
            form_index:-1,
            firstname: '',
            lastname: '',
            gender: '',
            password:'',
            newdata:[]
        }
    }

    componentDidMount() {

    }
    setValue(field, e) {
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }
    saveData(){
       const obj = {
           'firstName': this.state.firstname,
           'lastName': this.state.lastname,
           'Gender': this.state.gender,
           'Password': this.state.password
       }
        this.state.newdata.push(obj)
        this.setState({ newdata: this.state.newdata});
    }


    /* It is invoked to return html content */

    render() {
        
        var tableStyle = {
            border: '1px solid #ccc',
            border_collapse: 'collapse',
            width: '80%',
            margin: '2% auto'
        };
        var thstyle = {
            borderRight: '1px solid #ccc',
            width: 'auto',
            padding: '8px',
            background: '#000',
            color: '#fff'
        }
        var trstyle = {
            border: '1px solid #ccc'
        }
        var tdstyle = {
            borderRight: '1px solid #ccc',
            width: 'auto',
            padding: '8px'
        }
        var norecords = {
            textAlign: 'center',
            color: '#ff0000',
            fontWeight: 'bolder',
            padding: '10px'
        }

        var addMoreToAdd = {
            verticalAlign: 'middle',
            width: 'auto',
            margin: 'auto',
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px'
        }
        var itest = {
            border: '1px solid #ccc',
            margin: '10px 6px',
            padding: '5px',
            verticalAlign: 'middle'
        }
        //console.log(this.state.firstname,this.state.lastname,this.state.gender,this.state.password);
        return (
            <div>               
                
                <table style={tableStyle}>
                    <thead>
                        <th style={thstyle}>firstname</th>
                        <th style={thstyle}>lastname</th>
                        <th style={thstyle}>Gender</th>
                        <th style={thstyle}>Password</th>
                    </thead>


                    {this.state.newdata.length > 0 ? this.state.newdata.map((dynamicComponent, index) => <tbody key={index}>
                        <tr style={trstyle}>
                            <td style={tdstyle}>{dynamicComponent.firstName}</td>
                            <td style={tdstyle}>{dynamicComponent.lastName}</td>
                            <td style={tdstyle}>{dynamicComponent.Gender}</td>
                            <td style={tdstyle}>{dynamicComponent.Password}</td>
                            {/* <td style={tdstyle}>
                                <button onClick={this.onEditclick.bind(this, dynamicComponent, index)} data-toggle="modal" data-target="#listViewModal" className="btn"><i className="fa fa-pencil" aria-hidden="true"></i></button> &nbsp;&nbsp;
                                <button onClick={this.onDeleteclick.bind(this, index)} data-toggle="modal" data-target="#deleteModal" className="btn btn-danger"><i className="fa fa-times" aria-hidden="true"></i></button>
                            </td> */}
                        </tr>
                    </tbody>) : <tbody><tr style={trstyle}><td style={norecords} colSpan="4">No Records</td></tr></tbody>}
                </table>
                
                
                <div className="container">
                    <form>
                   
                    <div className="row">
                            <div className="col-25">
                                <label htmlFor="fname">First Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" id="fname" name="firstname"  placeholder="Your name.." onChange={this.setValue.bind(this, 'firstname')} value={this.state.firstname} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="lname">Last Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" id="lname" name="lastname" onChange={this.setValue.bind(this, 'lastname')} value={this.state.lastname} placeholder="Your last name.." />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="country">Gender</label>
                            </div>
                            <div className="col-75">
                                <select id="gender" name="gender" onChange={this.setValue.bind(this,'gender')} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="lname">Password</label>
                            </div>
                            <div className="col-75">
                                <input type="password" id="password" name="password" onChange={this.setValue.bind(this, 'password')} value={this.state.password} placeholder="Password.." />
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.saveData.bind(this)}>Add to List</button>
                        {/* <input type="submit" value="Submit" /> */}
                    </form>
                </div>              
            </div>
        );
    }
}


export default SampleForm;
