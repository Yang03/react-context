
import { createStore, applyMiddleware,combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { call, put, fork, take, takeLatest, takeEvery, select } from 'redux-saga/effects'

const reducer = (initDat = {a: 2}) => {
  return initDat
}

function* fetchUser(action) {
  console.log('fetchUser', action)
  return 'aaaa'
}


const combine = combineReducers({
  reducer
})
// function * next(action) {
//   console.log(action, 'next')
// }

// const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
//   let lastTask
//   while (true) {
//     const action = yield take(patternOrChannel)
//     if (lastTask) {
//       yield cancel(lastTask) // cancel is no-op if the task has already terminated
//     }
//     lastTask = yield fork(saga, ...args.concat(action))
//     yield fork(next, ...args.concat(action))
//   }
// })

// function* run() {
//  // const a = fn;

//   function* a() {
//     return yield fetchUser  
//   }
//   return a
// }

function* run(fn) {
  const data = yield select((state) => state)
  console.log(fn, data)
}

function* mySaga() {
  const a = yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  

  console.log(a)
   yield takeLatest("*", run);
  
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  combine,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)


function dispatch() {
  const dispatch = useDispatch();
  return new Pro
}


store.dispatch({
  type: 'USER_FETCH_REQUESTED',
  data: {
    a: 1
  }
})