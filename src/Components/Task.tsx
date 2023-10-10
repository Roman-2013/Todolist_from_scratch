import React, {useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

type TaskPropsType = {
    todoID: string
    id: string
    isDone: boolean
    title: string
    removeTask: (id: string, todoId: string) => void
    changeTaskStatus: (idTask: string, isDone: boolean, todoId: string) => void
    changeTaskTitle: (idTask: string, title: string, todoId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             id,
                                                             isDone,
                                                             title,
                                                             todoID,
                                                             removeTask,
                                                             changeTaskStatus,
                                                             changeTaskTitle
                                                         }) => {

    const onClickHandler = () => {
        removeTask(id, todoID)
    }
    const onChangeHandler = (checked: boolean) => {
        changeTaskStatus(id, checked, todoID)
    }
    const changeTaskInTitle = useCallback((title: string) => {
        changeTaskTitle(id, title, todoID)
    },[changeTaskTitle])

    return (
        <div className={isDone ? 'is-done' : ''} key={id}>
            <Checkbox
                checked={isDone}
                onChange={(e) => onChangeHandler(e.currentTarget.checked)}
                color={'secondary'}
            />
            <EditableSpan onChange={changeTaskInTitle} title={title}/>
            <IconButton color={'secondary'} onClick={onClickHandler} aria-label="delete">
                <BackspaceOutlinedIcon/>
            </IconButton>
        </div>
    );
});

