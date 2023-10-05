import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpan={
    title:string
    onChange:(title:string)=>void
}
export const EditableSpan:React.FC<EditableSpan> = ({title,onChange}) => {
    const [editMode,setEditMode]=useState<boolean>(false)
    const[titleInSpan,setTitleInSpan]=useState(title)

    const activateEditMode=()=>{
        setEditMode(!editMode)
        onChange(titleInSpan)
        console.log(titleInSpan)
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
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
            :<span onDoubleClick={activateEditMode}>{titleInSpan}</span>

    );
};

