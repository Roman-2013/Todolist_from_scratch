import React, {useState} from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../../state/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from '../../state/todolists-reducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


let todolistID1 = v1()
let todolistID2 = v1()


let initialGlobalState  = {
    todolists: [{id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}],
    tasks: {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'ajax', isDone: false},
        ],
    }
}

export const storyBookStore=createStore(rootReducer,initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}