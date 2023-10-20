import React, {useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import {TaskStatuses, TasksType} from '../api/tasks-api';
import {RequestStatusType} from '../app/app-reducer';


type TaskPropsType = {
    entityStatus:RequestStatusType
    todolistId: string
    task:TasksType
    removeTask: (id: string, todoId: string) => void
    changeTaskStatus: (idTask: string, status: TaskStatuses, todoId: string) => void
    changeTaskTitle: (idTask: string, title: string, todoId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             todolistId,
                                                             removeTask,
                                                             changeTaskStatus,
                                                             changeTaskTitle,
                                                             entityStatus
                                                         }) => {

    const onClickHandler = () => {
        removeTask(task.id, todolistId)
    }
    const onChangeHandler = (status: boolean) => {
        changeTaskStatus(task.id, status? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }
    const changeTaskInTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todolistId)
    },[changeTaskTitle])

    return (
        <div className={task.status ? 'is-done' : ''} key={task.id}>
            <Checkbox
                disabled={entityStatus==='loading'}
                checked={task.status===TaskStatuses.Completed}
                onChange={(e) => onChangeHandler(e.currentTarget.checked)}
                color={'secondary'}
            />
            <EditableSpan disabled={entityStatus==='loading'} onChange={changeTaskInTitle} value={task.title}/>
            <IconButton disabled={entityStatus==='loading'} color={'secondary'} onClick={onClickHandler} aria-label="delete">
                <BackspaceOutlinedIcon/>
            </IconButton>
        </div>
    );
});

