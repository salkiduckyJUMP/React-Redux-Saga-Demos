
const initialState = {
    // todos: [],
    V1: 0,
    V2: 0,
    status: 'Stopped'
};

const todosReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'FETCH_TODOS_SUCCESS':
        console.log(action.todos)
        return {
          ...state,
          todos: action.todos.data
        };
        case 'TODO_CREATED':
            console.log("Todo is created");
            break;
        case 'SHOW_CONGRATULATION':
            console.log("Congrats");
            // break;
        case 'START':
          console.log("Hello?");
          return {
          ...state,
          status: 'Running'
          };
        case 'STOP':
          console.log("In Stop");
          return {
            ...state,
            status: 'Stopped'
          };
        case 'RESET':
          return initialState;
        case 'TICK_V1':
          return {
            ...state,
            V1: state.V1 + action.plus
          }
        case 'TICK_V2':
          return {
            ...state,
            V2: state.V2 + action.plus
          }
        case 'V1_WIN':
          return {
            ...state,
            msg: 'V1 wins'
          }
        case 'V2_WIN':
          return {
            ...state,
            msg: 'V2 wins'
          }
        default:
          return state;
    }
  }
  

export default todosReducer;

