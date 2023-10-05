import React, {ChangeEvent, useState} from 'react';
import {log} from 'util';

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
            ? <input onChange={onChangeHandler} onBlur={activateEditMode} value={titleInSpan} autoFocus type="text"/>
            :<span onDoubleClick={activateEditMode}>{titleInSpan}</span>

    );
};

