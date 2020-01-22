import React, { Component } from 'react'
import {connect} from 'react-redux'
import ToDoItem from './TodoItem'

class ToDoList extends Component {

    render() {
        return (
            <ul>
                {this.props.todos.map(
                    todo => <ToDoItem deleteTodo={this.onDeleteTodo} key={todo.id} todo={todo} />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
    }
}

export default connect(mapStateToProps)(ToDoList);
