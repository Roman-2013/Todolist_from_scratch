import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType={
    addItem:(title:string)=>void
}

export const AddItemForm =(props:AddItemFormPropsType) => {

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
            <input
                onKeyDown={onKeyPressHandler}
                value={title}
                onChange={onChangeHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error ? <div className={'error-message'}>{error}</div> : ''}
        </div>
    );
};

