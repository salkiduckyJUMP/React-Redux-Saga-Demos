import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as ActionTypes from './actions/ActionTypes'
 class TodoItem extends Component{

    render(){
        return (
            <li className="todo-item">
              <span>
                {this.props.todo.content}
              </span>
              <span>
                <button onClick={() => this.props.onDeleteTodo(this.props.todo.id)}>Delete</button>
              </span>
            </li>
          )
    }
 } 

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTodo: (id) => dispatch({ type: ActionTypes.DELETE_TODO, id: id })
    }
};

export default connect(null, mapDispatchToProps)(TodoItem);