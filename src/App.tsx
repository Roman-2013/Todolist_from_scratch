import React, {useCallback, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'
export type ToodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType={
    [key:string]:TasksType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<ToodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
            ],
        }
    )


    const removeTodolist=(todoId:string)=>{
        setTodolists(todolists.filter(el=>el.id!==todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== id)})
    }


    const changeFilter = (filter: FilterValueType, todoId: string) => {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter} : el))
    }

    const addTask = (title: string, todoId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    const changeTaskStatus = (idTask: string, isDone: boolean, todoId: string) => {
        // setTasks([...tasks.map(el => el.id === idTask ? {...el, isDone: isDone} : el)])
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === idTask ? {...el, isDone} : el)})

    }


    return (
        <div className="App">
            {todolists.map(tl => {

                let taskForTodolist: TasksType[]

                if (tl.filter === 'active') {
                    taskForTodolist = tasks[tl.id].filter(el => el.isDone !== true)
                } else if (tl.filter === 'completed') {
                    taskForTodolist = tasks[tl.id].filter(el => el.isDone !== false)
                } else {
                    taskForTodolist = tasks[tl.id]
                }

                return (
                    <Todolist
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })

            }

        </div>
    );
}

export default App;
