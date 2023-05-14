import { TextField } from '@mui/material'
import React from 'react'

const InputControl = ({ label, type, handleChange, query }) => (
    <TextField
        required
        id='outlined-required'
        label={label}
        type={type}
        onChange={handleChange}
        defaultValue={query}
    />
)

export default InputControl