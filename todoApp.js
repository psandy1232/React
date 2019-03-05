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
