import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
    changeTaskTitle:(idTask: string, title: string, todoId: string)=>void
    changeTodolistTitle:(todoId: string,newTitle:string)=>void
}


export const Todolist = (props: TodolistPropsType) => {




    const addTask=(title:string)=>{
        props.addTask(title,props.todoId)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId)
    }
    const changeTodolistTitleHandler=(newTitle:string)=>{
        props.changeTodolistTitle(props.todoId,newTitle)
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
                    <EditableSpan onChange={changeTodolistTitleHandler} title={props.title} />
                    <button onClick={removeTodolistHandler}>X</button>
                </h3>
                <AddItemForm addItem={addTask} />
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.removeTask(el.id, props.todoId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.todoId)
                    }
                    const changeTaskTitle=(title:string)=>{
                        props.changeTaskTitle(el.id,title,props.todoId)
                    }

                    return (

                        <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan onChange={changeTaskTitle} title={el.title} />
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};

