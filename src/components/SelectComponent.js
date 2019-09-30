import React, { } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginButton: theme.spacing(1),
        width: '100%'
    },
}));

function SelectComponent({ name, placeholder, setValues, data, value }) {
    const classes = useStyles();

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name+'_id']: event.target.value,
        }));
    }

    return (
        <FormControl className={classes.formControl} fullWidth >
            <InputLabel htmlFor="age-simple">{name}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                inputProps={{
                    name: name,
                    id: name+"_id",
                }}
            >
                <MenuItem value="" >{placeholder}</MenuItem>
                {data.map(item => <MenuItem key={item.id} value={item.id} >{item.nombre}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default SelectComponent;