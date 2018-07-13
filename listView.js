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
            body: '',
            data: [

            ],
            index: -1,
            values: [

            ],
            am_index: 0,
            addItemsArray: [{ iuserid: '',ititle: '',ibody:'' }]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({ userid: val.id, title: val.title, body: val.body, index });
    }
    async saveData(e) {
        const existingPost = this.state.data[this.state.index];
        const updatedPost = update(existingPost, { id: { $set: Number(this.state.userid) }, title: { $set: this.state.title }, body: { $set: this.state.body } });
        let updatedPosts = update(this.state.data, { [this.state.index]: { $set: updatedPost } });
        await this.setState({ data: updatedPosts });

        setTimeout(function () {
            $(".modal-backdrop").removeClass('in');
            $(".modal-backdrop").addClass('out');
            $("#listViewModal").hide();
        }, 1000)
    }
    onDeleteclick(index) {
        this.setState({ index });
    }
    async deleteData() {
        await delete this.state.data[this.state.index];
        let remainData = this.state.data;
        this.setState({ data: remainData });
    }

    setValue(field, e) {
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }

    addClick() {
        $(".btnSubmit").removeClass('hide');
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        console.log(this.state.values);
        if (this.state.values.length > 1)
            $(".btnSubmit").removeClass('hide');
        else
            $(".btnSubmit").addClass('hide');

        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + 'hahahah');
        return false;
        event.preventDefault();
    }

    
    addItems() {
        const addItemsArray = _.concat(this.state.addItemsArray, [{ iuserid: '', ititle: '', ibody: '' }]);
        this.setState({ addItemsArray });
    }
    async valueSet(field, i, evt) {
        //console.log("Field =>",field, "Event =>",evt);
        // console.log("Target Value",evt.target.value);
        if (field == 'iuserid') {
            const existingPost = this.state.addItemsArray[i];
            const updatedPost = update(existingPost, { iuserid: { $set: evt.target.value } });
            let updatedPosts = update(this.state.addItemsArray, { [i]: { $set: updatedPost } });
            await this.setState({ addItemsArray: updatedPosts });

        }
        if (field == 'ititle') {
            const existingPost = this.state.addItemsArray[i];
            const updatedPost = update(existingPost, { ititle: { $set: evt.target.value } });
            let updatedPosts = update(this.state.addItemsArray, { [i]: { $set: updatedPost } });
            await this.setState({ addItemsArray: updatedPosts });

        }
        if (field == 'ibody') {
            const existingPost = this.state.addItemsArray[i];
            const updatedPost = update(existingPost, { ibody: { $set: evt.target.value } });
            let updatedPosts = update(this.state.addItemsArray, { [i]: { $set: updatedPost } });
            await this.setState({ addItemsArray: updatedPosts });

        }
    }



    /* It is invoked to return html content */
    render() {
        // console.log(this.state.data, '== data');
         console.log("ArrayItems", this.state.addItemsArray);
        var no_of_records = this.state.data.length;
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


        return (
            <div>
                {/* {Add more elements to this.state.data object at a time } */}

                <form onSubmit={this.handleSubmit}>
                    <div style={addMoreToAdd} >
                        {/* {this.createUI(itest)} */}
                        {console.log(this.state.addItemsArray)}
                        
                        {this.state.addItemsArray.map((el, i) =>
                            <div key={i}>
                                <input type="text" style={itest} placeholder="User ID" value={el.iuserid} onChange={this.valueSet.bind(this, 'iuserid', i)} name={i}/>
                                <input type="text" style={itest} placeholder="Title" value={el.ititle} onChange={this.valueSet.bind(this, 'ititle', i)} name={i}/>
                                <input type="text" style={itest} placeholder="Body" value={el.ibody} onChange={this.valueSet.bind(this, 'ibody', i)} name={i}/>

                                <button type='button' className="btn btn-alert" onClick={this.addItems.bind(this, el, i)}><i className="fa fa-cloud" aria-hidden="true"></i> Save</button> &nbsp;&nbsp;
                                <input type='button' className="btn btn-danger" value='- Remove' onClick={this.removeClick.bind(this, i)} />
                            </div>
                        )}
                        

                        <input type='button' value='+ Add More' className="btn btn-success" onClick={this.addItems.bind(this)} />
                        &nbsp;
                        <input type="submit" value="Submit" className="btn btn-alert btnSubmit hide" />
                    </div>
                </form>




                <table style={tableStyle}>
                    <thead>
                        <th style={thstyle}>ID</th>
                        <th style={thstyle}>Title</th>
                        <th style={thstyle}>Body</th>
                        <th style={thstyle}>Actions</th>
                    </thead>


                    {this.state.data.length > 0 ? this.state.data.slice(0, 10).map((dynamicComponent, index) => <tbody key={index}>
                        <tr style={trstyle}>
                            <td style={tdstyle}>{dynamicComponent.id}</td>
                            <td style={tdstyle}>{dynamicComponent.title}</td>
                            <td style={tdstyle}>{dynamicComponent.body}</td>
                            <td style={tdstyle}>
                                <button onClick={this.onEditclick.bind(this, dynamicComponent, index)} data-toggle="modal" data-target="#listViewModal" className="btn"><i className="fa fa-pencil" aria-hidden="true"></i></button> &nbsp;&nbsp;
                                <button onClick={this.onDeleteclick.bind(this, index)} data-toggle="modal" data-target="#deleteModal" className="btn btn-danger"><i className="fa fa-times" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>) : <tbody><tr style={trstyle}><td style={norecords} colSpan="4">No Records</td></tr></tbody>}
                </table>

                <div className="modal fade" id="listViewModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content rm-border-radius">
                            <div className="modal-header">
                                <h2 style={{ float: 'left' }}>Edit Details</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="">
                                    <span>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="userid">User ID:</label>
                                    <input className="form-control" type="number" maxLength="5" required id="userid" placeholder='UserID' onChange={this.setValue.bind(this, 'userid')} value={this.state.userid} />

                                    <label htmlFor="title">Title:</label>
                                    <input className="form-control" required id="title" placeholder='Title' onChange={this.setValue.bind(this, 'title')} value={this.state.title} />

                                    <label htmlFor="body">Body:</label>
                                    <textarea className="form-control" id="body" placeholder='Body' onChange={this.setValue.bind(this, 'body')} value={this.state.body} />

                                    <div className="clearfix"></div>
                                    <label style={{ margin: '30px 0' }}>&nbsp;</label>

                                    <button onClick={this.saveData.bind(this)} data-dismiss="modal" className="btn btn-primary" >Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="deleteModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content rm-border-radius">
                            <div className="modal-header">

                                <button type="button" className="close" data-dismiss="modal" aria-label="">
                                    <span>×</span>
                                </button>
                            </div>
                            <div className="modal-body ">
                                <div style={{ 'width': '100%', 'float': 'left', 'marginBottom': '30px' }}>Are you sure want to delete data?</div>
                                <div className="form-group">
                                    <button className="btn btn-success" data-dismiss="modal" onClick={this.deleteData.bind(this)} >Yes</button> &nbsp;&nbsp;&nbsp;
                                         <button className="btn btn-danger" data-dismiss="modal" >Cancel</button>
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
