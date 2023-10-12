import React, {useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import {TasksType} from '../Todolist';

type TaskPropsType = {
    todolistId: string
    task:TasksType
    removeTask: (id: string, todoId: string) => void
    changeTaskStatus: (idTask: string, isDone: boolean, todoId: string) => void
    changeTaskTitle: (idTask: string, title: string, todoId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             todolistId,
                                                             removeTask,
                                                             changeTaskStatus,
                                                             changeTaskTitle
                                                         }) => {

    const onClickHandler = () => {
        removeTask(task.id, todolistId)
    }
    const onChangeHandler = (checked: boolean) => {
        changeTaskStatus(task.id, checked, todolistId)
    }
    const changeTaskInTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todolistId)
    },[changeTaskTitle])

    return (
        <div className={task.isDone ? 'is-done' : ''} key={task.id}>
            <Checkbox
                checked={task.isDone}
                onChange={(e) => onChangeHandler(e.currentTarget.checked)}
                color={'secondary'}
            />
            <EditableSpan onChange={changeTaskInTitle} value={task.title}/>
            <IconButton color={'secondary'} onClick={onClickHandler} aria-label="delete">
                <BackspaceOutlinedIcon/>
            </IconButton>
        </div>
    );
});

