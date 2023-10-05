import Button from '@mui/material/Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    return (
        <div>
            <TextField
                variant="outlined"
                onKeyDown={onKeyPressHandler}
                value={title}
                onChange={onChangeHandler}
                color={'secondary'}
                error={!!error}
                helperText={error}

            />
            <IconButton
                aria-label="delete"
                color={'secondary'}
                onClick={addItem}>
                <AddRoundedIcon />
            </IconButton>

        </div>
    );
};

