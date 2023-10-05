import React, {ChangeEvent } from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

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


export const Todolist = (props: TodolistPropsType) => {


    const addTask = (title: string) => {
        props.addTask(title, props.todoId)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todoId, newTitle)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.todoId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoId)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan onChange={changeTodolistTitleHandler} title={props.title}/>
                    <IconButton color={'secondary'} onClick={removeTodolistHandler} aria-label="delete">
                   <ClearRoundedIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.removeTask(el.id, props.todoId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.todoId)
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(el.id, title, props.todoId)
                    }

                    return (
                        <div className={el.isDone ? 'is-done' : ''} key={el.id}>
                            <Checkbox
                                checked={el.isDone}
                                onChange={onChangeHandler}
                                color={'secondary'}
                            />
                            <EditableSpan onChange={changeTaskTitle} title={el.title}/>
                            <IconButton color={'secondary'} onClick={onClickHandler} aria-label="delete">
                                <BackspaceOutlinedIcon/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    //className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                    color="secondary"
                >
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    //className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                    color={'secondary'}
                >
                    Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};

