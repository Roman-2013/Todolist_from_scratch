import React from 'react';
import Button from '@mui/material/Button';

type ButtonPropsType = {
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    name:string
}

export const CustomButton =React.memo( (props: ButtonPropsType) => {
    console.log('Button call')
    return (

            <Button
                variant={props.variant}
                onClick={props.onClick}
                color={props.color}
            >
                {props.name}
            </Button>

    );
});
