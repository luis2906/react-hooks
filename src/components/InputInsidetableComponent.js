import React, { }from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
        marginTop: 0,
        marginButton: theme.spacing(1),
		width: '100%'
    }
}));


function InputInsidetableComponent({name, placeholder, actualizarCantidad}) {
    const classes = useStyles();
    
    const handleChange = name => event => {
        actualizarCantidad(event.target.value, name);
	};
    
    return (
        <FormControl fullWidth className={classes.formControl} >
            <Input
                placeholder={placeholder}
                id={name.toString()}
                onChange={handleChange(name)}
                mt={0}
                inputProps={{
                    'className': 'pt-0',
                  }}
            />
        </FormControl>
    );
}

export default InputInsidetableComponent;