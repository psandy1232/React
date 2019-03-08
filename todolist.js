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
    this.makeComplete = this.makeComplete.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentWillReceiveProps(props){
    
  }
  componentDidMount(){
    //console.log(this.state,"fdfs")
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

  render() {   
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

          <TodoListItem {...this.state}  
            makeComplete={this.makeComplete}
            removeTask={this.removeTask}
            showEdit={this.showEdit}
            cancelEdit={this.cancelEdit}
            saveEdit={this.saveEdit}
            setValue={this.setValue}
          />
          

        </div>
      </div>

    );
  }
}


class TodoListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render(){
   
    return(
      <div className="listItems">
        <ul>
          {
            (this.props.todoOutput.length > 0) ?
              this.props.todoOutput.map((item, i) =>
                <li key={i} className={item.status == 'pending' ? 'pending' : 'completed'}>
                  {
                    (this.props.action === 'edit' && this.props.index == i) ?
                      <div className="actions">
                        <input type="text"
                          name="editInput"
                          placeholder="Enter your list here"
                          className="formInput"
                          value={this.props.editInput}
                          onChange={this.props.setValue.bind(this, 'editInput')}
                        />
                      </div>
                    :
                    (i + 1 + ". " + item.title) 
                  }

                  {item.status === 'pending' ?
                    (this.props.action === 'edit' && this.props.index == i) ?
                      <div className="actions">
                        <button type="button" className="btn btn-success" onClick={this.props.saveEdit.bind(this, i)} >Save</button>
                        <button type="button" className="btn btn-default" onClick={this.props.cancelEdit.bind(this)} >Cancel</button>
                      </div>
                      :
                      <div className="actions">
                        <span onClick={this.props.removeTask.bind(this, i)}><i className="fa fa-times-circle" title="Remove from list" aria-hidden="true"></i></span>

                        <span onClick={this.props.showEdit.bind(this, i)}><i className="far fa-edit"></i></span>


                        <span onClick={this.props.makeComplete.bind(this, i)}><i className="fa fa-check-circle" title="Click to Complete" aria-hidden="true"></i></span>
                      </div>

                    :
                    <span><i className="fa fa-check-circle" title="Completed" aria-hidden="true"></i></span>
                  }
                </li>
              )
              :
              <li key={1} className="error text-center">You haven't Created any To Do list yet.</li>
          }
        </ul>
      </div>
    )
  }
}  
