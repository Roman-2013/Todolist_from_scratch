import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (idTask: string, isDone: boolean) => void
    filter: FilterValueType
}


export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

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
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>

            <h3>{props.title}</h3>
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
                        props.removeTask(el.id)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
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

