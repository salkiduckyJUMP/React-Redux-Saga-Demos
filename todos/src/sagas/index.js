import axios from 'axios';
import { call, put, takeEvery, all, select , take, cancel, race, fork} from 'redux-saga/effects';

//Todos Logic
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=edgar1234';

export function* fetchTodos() {
  try {
    //console.log("Its fetching...")
    const todos = yield call(axios.get, `${ROOT_URL}/posts${API_KEY}`);
    yield put({ type: 'FETCH_TODOS_SUCCESS', todos})
  } catch (error) {
    console.log('fetchTodos error:', error.message)
  }
}

function* watchFetchTodos() {
  yield takeEvery('FETCH_TODOS', fetchTodos)
}

export function* createTodo(action) {
  const newTodo = { title: '', categories: '', content: action.payload };
  try {
    yield call(axios.post, `${ROOT_URL}/posts${API_KEY}`, newTodo);
    yield put({type:'FETCH_TODOS'});
  } catch (error) {
    console.log('createTodo error:', error.message);
  }
}

function * watchAddToDo() {
  yield takeEvery('ADD_TODO', createTodo)
}

export function* deleteTodo({id}) {
  try {
    yield call(axios.delete, `${ROOT_URL}/posts/${id}${API_KEY}`);
    yield put({type: 'FETCH_TODOS'})
  } catch (error) {
    console.log('deleteTodo Error:', error.message);
  }
}


function* watchDeleteTodo() {
  yield takeEvery('DELETE_TODO', deleteTodo)
}

function* watchAndLog() {
  // yield takeEvery('*', function* logger(action) {
  //   const state = yield select()

  //   console.log('action', action)
  //   console.log('state after', state)
  // })
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action);
    console.log('state after', state);
  }

}

function* watchFirstThreeTodosCreation() {

  for (let i = 0; i < 3; i++) {
    const action = yield take('ADD_TODO')
  }
  yield put({ type: 'SHOW_CONGRATULATION' })
}

//Race Logic Here.
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
export const getPlus = () => Math.floor(Math.random() * 50)
let counter1 = 0;
let counter2 = 0;

export function* tickV1() {
  while(true) {
    yield call(delay, 1000);
    const plus = yield call(getPlus)
    counter1 += plus
    console.log("Counter1 " + counter1);
    yield put({type: 'TICK_V1', plus });
    if (counter1 >= 100) return true
  }
}

export function* tickV2() {
  while(true) {
    yield call(delay, 1000);
    const plus = yield call(getPlus)
    counter2 += plus
    console.log("Counter2 " + counter2);
    yield put({type: 'TICK_V2', plus});
    if (counter2 >= 100) return true
  }
}

export function* watchRace() {
  while(true) {
    yield take('START')
    console.log('Race started');
    const {v1, v2} = yield race({
      v1: call(tickV1),
      v2: call(tickV2)
    })
    yield put({type: 'STOP'})

    if (v1) {
      yield put({type: 'V1_WIN'})
    } else {
      yield put({type: 'V2_WIN'})
    }
  }
}

export function* reset() {
  while(true) {
    yield take('RESET')
    counter1 = 0
    counter2 = 0
  }
}

export default function* rootSaga() {
  // yield all([
  //   watchFetchTodos(),
  //   watchAddToDo(),
  //   watchDeleteTodo(),
  //   watchAndLog(),
  //   watchFirstThreeTodosCreation()
  // ])

  // yield [
  //   fork(watchRace),
  //   fork(reset)
  // ]

  yield call(watchRace);
};
