import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm =React.memo( (props: AddItemFormPropsType) => {
    console.log('AddItemForm called')
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
        if(error!==null){
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return (
        <div>
            <TextField
                disabled={props.disabled}
                variant="outlined"
                onKeyDown={onKeyPressHandler}
                value={title}
                onChange={onChangeHandler}
                color={'secondary'}
                error={!!error}
                helperText={error}

            />
            <IconButton
                disabled={props.disabled}
                aria-label="delete"
                color={'secondary'}
                onClick={addItem}>
                <AddRoundedIcon />
            </IconButton>

        </div>
    );
});

