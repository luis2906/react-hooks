import React, { } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	},
}));


function InputSearchComponent({name, placeholder, setValuesInput, data}) {
    const classes = useStyles();
    
    const handleChange = name => event => {
        setValuesInput({ ...data, [name]: event.target.value });
	};
    
    return (
        <FormControl className={classes.formControl} >
            <Input
                placeholder={placeholder}
                id={name}
                onChange={handleChange(name)}
                endAdornment={
                    <InputAdornment position="end">
                        <Search />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

export default InputSearchComponent;