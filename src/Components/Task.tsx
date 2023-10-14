import React, {useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import {TaskStatuses, TasksType} from '../api/tasks-api';


type TaskPropsType = {
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
                                                             changeTaskTitle
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
                checked={task.status===TaskStatuses.Completed}
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

