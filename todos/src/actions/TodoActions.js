import * as ActionTypes from './ActionTypes';

export const deleteTodo = (id) => {
    return {
      type: ActionTypes.DELETE_TODO,
      id
    }
  }
  
  export const fetchTodos = () => {
    return { type: ActionTypes.FETCH_TODOS }
  }
  
  export const showCongratulation = () => {
    return { type: ActionTypes.SHOW_CONGRATULATION }
  }