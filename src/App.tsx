import React, {useCallback, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')


    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (idTask: string, isDone: boolean) => {
        setTasks([...tasks.map(el => el.id === idTask ? {...el, isDone: isDone} : el)])


    }


    let taskForTodolist: TasksType[]

    if (filter === 'active') {
        taskForTodolist = tasks.filter(el => el.isDone !== true)
    } else if (filter === 'completed') {
        taskForTodolist = tasks.filter(el => el.isDone !== false)
    } else {
        taskForTodolist = tasks
    }


    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
