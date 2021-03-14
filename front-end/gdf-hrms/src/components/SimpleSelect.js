import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
    width: '25ch',
    //minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

    

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [selectValue, setSelectValue] = React.useState('');

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

 const selectOption = (option) => {
     return option.map((options) => <MenuItem>{options}</MenuItem>);
 }
  
  return (
    <div>
      <FormControl variant = "outlined" size="small" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" > {props.selectLabel} </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          onChange={handleChange}
          
        >

        <selectOption option={props.option}></selectOption>
          
        </Select>
      </FormControl>
    </div>
  );
}
