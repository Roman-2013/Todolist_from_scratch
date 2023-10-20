import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpan = {
    value: string
    onChange: (title: string) => void
    disabled?:boolean
}
export const EditableSpan: React.FC<EditableSpan> = React.memo( ({value, onChange,disabled}) => {
    console.log('EditableSpan called')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleInSpan, setTitleInSpan] = useState(value)

    const activateEditMode = () => {
        if(!disabled){
            setEditMode(!editMode)
            onChange(titleInSpan)
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInSpan(e.currentTarget.value)
    }
    return (

        editMode
            ? <TextField
                color={'secondary'}
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={activateEditMode}
                value={titleInSpan} autoFocus type="text"
            />
            : <span onDoubleClick={activateEditMode}>{titleInSpan}</span>

    );
});

