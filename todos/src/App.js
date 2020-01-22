import React, { Component } from 'react';
import {connect} from 'react-redux'
import ToDoList from './TodoList'

import * as actions from './actions/ActionTypes';

import Race from './components/Race';

class App extends Component {
    constructor(props) {
      super(props);
      this.text = React.createRef();
    }
  
    handleSubmit() {
      this.props.dispatch({ type: 'ADD_TODO', payload: this.text.current.value })
    }  
    render() {

      // const { v1, v2, msg, status, ...actions } = this.props;

      return (
        <div className="app">
          <h1>To Do List App</h1>
          <input ref={this.text}/>
          <button onClick={()=>{this.handleSubmit()}}>Create Todo</button>
          {/* <ToDoList/> */}

          <hr />
          <Race msg = {this.props.msg}/>
        </div>
      );
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      v1: state.V1,
      v2: state.V2,
      msg: state.msg,
      status: state.status
    }
  }

  export default connect(mapStateToProps, {
    start: actions.START,
    reset: actions.RESET
  })(App);  