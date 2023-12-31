import { tasksReducer } from '../state/tasks-reducer'
import { todolistsReducer } from '../state/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from 'features/Login/auth-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer,
    auth:authReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type useAppDispatchType=ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch=()=>useDispatch<useAppDispatchType>()
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
