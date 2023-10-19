import React, {useState} from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../../state/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from '../../state/todolists-reducer';
import {v1} from 'uuid';
import {TaskStatuses} from '../../api/tasks-api';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


// let todolistID1 = v1()
// let todolistID2 = v1()
//
//
// let initialGlobalState  = {
//     todolists: [{id: todolistID1, title: 'What to learn', filter: 'all',addedDate: '', order: 0},
//         {id: todolistID2, title: 'What to buy', filter: 'all',addedDate: '', order: 0}],
//     tasks: {
//         [todolistID1]: [
//             {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,  description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false},
//             {id: v1(), title: 'JS', status: TaskStatuses.Completed,  description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false},
//             {id: v1(), title: 'ReactJS', status: TaskStatuses.New,  description: '', todoListId: todolistID1,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false}
//         ],
//         [todolistID2]: [
//             {id: v1(), title: 'Rest API', status: TaskStatuses.Completed,  description: '', todoListId: todolistID2,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false},
//             {id: v1(), title: 'GraphQL', status: TaskStatuses.New,  description: '', todoListId: todolistID2,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false},
//             {id: v1(), title: 'ajax', status: TaskStatuses.New,  description: '', todoListId: todolistID2,
//                 deadline: '', addedDate: '', order: 0, priority: 0, startDate: '',completed: false},
//         ],
//     }
// }

export const storyBookStore=createStore(rootReducer,applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}