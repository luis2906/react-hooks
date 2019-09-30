import React, { }from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
        marginTop: theme.spacing(1),
        marginButton: theme.spacing(1),
		width: '100%'
	},
}));


function InputFormComponent({name, placeholder, setValuesInput, data, value}) {
    const classes = useStyles();
    
    const handleChange = name => event => {
        setValuesInput({ ...data, [name]: event.target.value });
	};
    
    return (
        <FormControl fullWidth className={classes.formControl} >
            <Input
                placeholder={placeholder}
                id={name}
                onChange={handleChange(name)}
                value={value}
            />
        </FormControl>
    );
}

export default InputFormComponent;