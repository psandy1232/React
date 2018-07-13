/* Importing the node modules, child components, services and controllers used 
   inside IntranetHome component */
import React from 'react';
import { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
/* IntranetHome Component initialization */
class ListView extends Component {
    /* Initializing objects of its IntranetHome class */
    constructor(props) {
        super(props)
        this.state = {
            userid: '',
            title: '',
            data: [

            ],
            index: -1
        }
    }
    /* It is invoked immediately after a component is mounted */

    componentDidMount() {
        //console.log('statevalue1',$.getJSON('https://jsonplaceholder.typicode.com/posts'));
        // var retData = $.getJSON('https://jsonplaceholder.typicode.com/posts');
        // this.setState({ data: "tests" });   
        // console.log('newstate',retData);

        // fetch('https://jsonplaceholder.typicode.com/posts').
        //     then(response => response.json()).then((repos) => {
        //         console.log(repos);
        //         this.setState({
        //             data: repos
        //         });
        //     });
        let xyz = 'test';
        let _this = this;
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (response) {
                _this.setState({
                    data: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onEditclick(val, index) {
        this.setState({ userid: val.id, title: val.title, body: val.body, index});
    }
   async saveData(e){
        const existingPost = this.state.data[this.state.index];   
        const updatedPost = update(existingPost, { id: {$set: Number(this.state.userid)}, title: {$set: this.state.title}, body: {$set: this.state.body}});    
        let updatedPosts = update(this.state.data, { [this.state.index]: {$set: updatedPost} });   
        await this.setState({data : updatedPosts});
        setTimeout(function(){
            $("#listViewModal").hide();
        },1000)
    }

    setValue(field, e) {
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }

    /* It is invoked to return html content */

    render() {
        console.log(this.state.data, '== data');

        var tableStyle = {
            border: '1px solid #ccc',
            border_collapse: 'collapse',
            width: '70%',
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

        return (
            <div>
                <table style={tableStyle}>
                    <thead>
                        <th style={thstyle}>ID</th>
                        <th style={thstyle}>Title</th>
                        <th style={thstyle}>Body</th>
                        <th style={thstyle}>Actions</th>
                    </thead>
                    {this.state.data.slice(0, 5).map((dynamicComponent, index) => <tbody key={index}>
                        <tr style={trstyle}>
                            <td style={tdstyle}>{dynamicComponent.id}</td>
                            <td style={tdstyle}>{dynamicComponent.title}</td>
                            <td style={tdstyle}>{dynamicComponent.body}</td>
                            <td style={tdstyle}>
                                <button onClick={this.onEditclick.bind(this, dynamicComponent,index)} data-toggle="modal" data-target="#listViewModal" className="btn"><i className="fa fa-pencil" aria-hidden="true"></i>

                                </button>
                            </td>
                        </tr>
                    </tbody>)}

                </table>

                <div className="modal fade" id="listViewModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content rm-border-radius">
                            <div className="modal-header">
                            <h2 style={{float:'left'}}>Edit Details</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="">
                                    <span>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                                

                                    <div className="form-group">
                                        <label htmlFor="userid">User ID:</label>
                                        <input className="form-control" required id="userid" placeholder='UserID' onChange={this.setValue.bind(this, 'userid')} value={this.state.userid} />

                                        <label htmlFor="title">Title:</label>
                                        <input className="form-control" required id="title" placeholder='Title' onChange={this.setValue.bind(this, 'title')} value={this.state.title} />

                                        <label htmlFor="body">Body:</label>
                                        <textarea className="form-control" id="body" placeholder='Body' onChange={this.setValue.bind(this, 'body')} value={this.state.body} />
                                         
                                         <div className="clearfix"></div>
                                         <label style={{margin:'30px 0'}}>&nbsp;</label>
                                         
                                         <button onClick={this.saveData.bind(this)} className="btn btn-primary" >Submit</button>

                                    </div>

         

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default ListView;
