import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskStatuses} from '../api/tasks-api';

let startState: TasksStateType
beforeEach(()=>{
    startState={
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', todoListId: 'todolistId2',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed,  description: '', todoListId: 'todolistId2',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New,  description: '', todoListId: 'todolistId2',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New,  description: '', todoListId: 'todolistId1',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: '' }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New,  description: '', todoListId: 'todolistId2',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New,  description: '', todoListId: 'todolistId2',
                deadline: '', addedDate: '', order: 0, priority: 0, startDate: ''}
        ]
    })
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'My_New_Super_Title', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('My_New_Super_Title')
})
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

