import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from './App';


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
    removeTodolist:(todoId:string)=>void
}


export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todoId)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

const removeTodolistHandler=()=>{
        props.removeTodolist(props.todoId)
}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
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
                <h3>{props.title}</h3>
                <button onClick={removeTodolistHandler}>X</button>

            </div>


            <div>
                <input
                    onKeyDown={onKeyPressHandler}
                    value={title}
                    onChange={onChangeHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error ? <div className={'error-message'}>{error}</div> : ''}
            </div>

            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = () => {
                        props.removeTask(el.id, props.todoId)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.todoId)
                    }

                    return (
                        <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{el.title}</span>
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

