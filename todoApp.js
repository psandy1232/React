"use strict";
import React, { Component } from "react";
import axios from "axios";


export default class PSTNForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      todoInput: '',
      editInput: '',
      index: -1,
      todoOutput: [

      ]
    };
  }

  addToDo(e) {
    e.preventDefault();
    if (this.state.todoInput) {
      var temp = this.state.todoOutput;
      var data = { title: this.state.todoInput, status: 'pending' };
      temp.push(data);
      this.setState({
        todoOutput: temp,
        todoInput: ''
      })
    } else {
      alert("Please add any task to submit.");
      return false;
    }
  }
  makeComplete(i) {
    if (confirm("Are you sure wants to complete it?")) {
      let exData = this.state.todoOutput[i];
      exData.status = 'completed';
      exData = [...this.state.todoOutput];
      this.setState({ todoOutput: exData });
    }
  }
  removeTask(i) {
    let data = [...this.state.todoOutput];
    data.splice(i, 1);
    this.setState({ todoOutput: data });
  }
  setValue(field, e) {
    var object = {};
    object[field] = e.target.value;
    this.setState(object);
  }

  showEdit(i) {
    let title = this.state.todoOutput[i].title;
    this.setState({ editInput: title, action: 'edit', index: i });
  }
  cancelEdit() {
    this.setState({ editInput: '', action: '', index: -1 });
  }
  saveEdit(i) {
    let exData = this.state.todoOutput[i];
    exData.title = this.state.editInput;
    exData = [...this.state.todoOutput];
    this.setState({ todoOutput: exData, editInput: '', action: '', index: -1 });
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
     /*  .form-group.required .control-label:after {
      color: #d00;
      content: "*";
      margin-left: 8px;
      top: 7px;
      font-family: 'Glyphicons Halflings';
      font-weight: normal;
      font-size: 10px;
    }

    .btn {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;


    }

    .btn-primary {
      background-image: -webkit-linear-gradient(top, rgb(31, 78, 121) 0, rgb(31, 78, 121) 100%) !important;
      background-image: -o-linear-gradient(top, rgb(31, 78, 121) 0, rgb(31, 78, 121) 100%) !important;
      background-image: -webkit-gradient(linear, left top, left bottom, from(rgb(31, 78, 121)), to(rgb(31, 78, 121)))!important;
      background-image: linear-gradient(to bottom, rgb(31, 78, 121) 0, rgb(31, 78, 121) 100%) !important;
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='rgb(31, 78, 121)', endColorstr='rgb(31, 78, 121)', GradientType=0) !important;
      filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
      background-repeat: repeat-x;
      border-color: rgb(31, 78, 121);
    }

    .btn-primary {
      color: #fff;
      background-color: rgb(31, 78, 121) !important;
      border-color: rgb(31, 78, 121) !important;
    }

    .btn-danger,
    .btn-default,
    .btn-info,
    .btn-primary,
    .btn-success,
    .btn-warning {
      text-shadow: 0 -1px 0 rgba(0, 0, 0, .2);
      -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgb(31, 78, 121) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1p x rgb(31, 78, 121) !important;
    }

    .image-span {
      position: absolute;
      top: 8px;
      left: 117px;
      background: #fff;
      padding: 0px 25px 1px 21px;
    }



    .inner_container {
      min-height: 500px;
      height: auto;
      width: 50%;
      margin: auto;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
   

    .todocont {
      background-color: darkgrey;

      text-align: center;
      padding: 10px 5px;
    }

    .listItems {
      background-color: #eee;
    }

    .listItems ul {
      list-style-type: none;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .listItems ul li {
      list-style: none;
      width: 100%;
      border-bottom: 1px solid #fff;
      padding: 10px 8px;
      font-family: Verdana;
    }

    .pending {
      color: #ff0000;
    }

    .formInput {
      display: inline;
      width: 70%;
      height: 36px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      vertical-align:middle;
    }
    
    .actions{
      display: inline;
    }
    .completed {
      color: green;
    }

    .completed span{
      float: right;
     
    }
    .completed .fa-check-circle {     
      font-size: 24px;
      color: green;
    }
    
    .pending span{
      cursor: pointer;
      float: right;
      
    }
    .pending .fa-check-circle {     
      font-size: 24px;
      color: #ccc;      
    }
    .pending .fa-times-circle {     
      font-size: 24px;
      color: #ff0000; 
      padding-left: 10px;     
    }
    .pending .fa-pencil-square-o{
      font-size: 24px;
      color: #ff0000; 
      padding-left: 10px;     
    }
    .pending .fa-info{
      font-size: 24px;
      color:#0f74a5b8; 
      padding-left: 10px;  
    }
    .actions > .btn{
      margin: 0 5px;
    } */
    //console.log(this.state.todoOutput, "OUPTPTU");
    return (
      <div className="container">
        <div className="inner_container">
          <h1>To Do List</h1>
          <div className="todocont">
            <form onSubmit={this.addToDo.bind(this)}  >
              <input type="text"
                name="todoInput"
                placeholder="Enter your list here"
                className="formInput"
                value={this.state.todoInput}
                onChange={this.setValue.bind(this, 'todoInput')}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary" name="button">Add</button>
            </form>
          </div>

          <div className="listItems">
            <ul>
              {
                (this.state.todoOutput.length > 0) ?
                  this.state.todoOutput.map((item, i) =>
                    <li key={i} className={item.status == 'pending' ? 'pending' : 'completed'}>
                      {
                        (this.state.action === 'edit' && this.state.index == i) ?
                          <div className="actions">
                            <input type="text"
                              name="editInput"
                              placeholder="Enter your list here"
                              className="formInput"
                              value={this.state.editInput}
                              onChange={this.setValue.bind(this, 'editInput')}
                            />
                          </div>
                         :
                         (i + 1 + ". " + item.title) 
                      }

                      {item.status === 'pending' ?
                        (this.state.action === 'edit' && this.state.index == i) ?
                          <div className="actions">
                            <button type="button" className="btn btn-success" onClick={this.saveEdit.bind(this, i)} >Save</button>
                            <button type="button" className="btn btn-default" onClick={this.cancelEdit.bind(this)} >Cancel</button>
                          </div>
                          :
                          <div className="actions">
                            <span onClick={this.removeTask.bind(this, i)}><i className="fa fa-times-circle" title="Remove from list" aria-hidden="true"></i></span>

                            <span onClick={this.showEdit.bind(this, i)}><i className="fa fa-info"></i></span>


                            <span onClick={this.makeComplete.bind(this, i)}><i className="fa fa-check-circle" title="Click to Complete" aria-hidden="true"></i></span>
                          </div>

                        :
                        <span><i className="fa fa-check-circle" title="Completed" aria-hidden="true"></i></span>
                      }
                    </li>
                  )
                  :
                  <li key={1} className="error text-center">You have not Created to do list yet.</li>
              }

            </ul>
          </div>

        </div>
      </div>

    );
  }
}
