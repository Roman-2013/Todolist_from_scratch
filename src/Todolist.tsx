import React, { useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {CustomButton} from './Components/Button';
import {TaskStatuses, TasksType} from './api/tasks-api';
import {FilterValueType} from './state/todolists-reducer';
import {Task} from './Components/Task';





type TodolistPropsType = {
    todoId: string
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: (value: FilterValueType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (idTask: string, isDone: boolean, todoId: string) => void
    filter: FilterValueType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (idTask: string, title: string, todoId: string) => void
    changeTodolistTitle: (todoId: string, newTitle: string) => void
}


export const Todolist =React.memo( (props: TodolistPropsType) => {
    console.log('Todolist called')

    const addTask =useCallback( (title: string) => {
        props.addTask(title, props.todoId)
    },[props.addTask,props.todoId])
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId)
    }
    const changeTodolistTitleHandler =useCallback( (newTitle: string) => {
        props.changeTodolistTitle(props.todoId, newTitle)
    },[props.changeTodolistTitle,props.todoId])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todoId)
    },[props.changeFilter,props.todoId])
    const onActiveClickHandler =useCallback( () => {
        props.changeFilter('active', props.todoId)
    },[props.changeFilter,props.todoId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todoId)
    },[props.changeFilter,props.todoId])


    let taskForTodolist:TasksType[]

    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(el => el.status !== TaskStatuses.Completed)
    } else if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(el => el.status !== TaskStatuses.New)
    }else{
        taskForTodolist=props.tasks
    }

    return (
        <div>
            <div className={'container'}>
                <h3>

                    <EditableSpan onChange={changeTodolistTitleHandler} value={props.title}/>

                    <IconButton color={'secondary'} onClick={removeTodolistHandler} aria-label="delete">
                   <ClearRoundedIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {taskForTodolist.map(el => {
                    return (
                        <Task
                            task={el}
                            todolistId={props.todoId}
                            key={el.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )
                })}
            </div>
            <div>
                <CustomButton
                    name={'All'}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    color={'secondary'}
                />
                <CustomButton
                    name={'Active'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'secondary'}
                />
                <CustomButton
                    name={'Completed'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                />
            </div>
        </div>
    );
});

