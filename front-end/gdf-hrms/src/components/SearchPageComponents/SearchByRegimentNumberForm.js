import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),    
  },
    
  cardcontents: {        
    flex: 1,
    float: 'left',
    margin: theme.spacing(5),   
  },

  paragraphColor: {
    color: 'red'
  }
}));

export default function SearchByRegimentNumberForm(props) {

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();  
    
  return (    
    <React.Fragment>
      <div>
        <Card>
          <CardContent className={classes.cardcontents}>          
            <form className={classes.form} align='center' onSubmit={handleSubmit(props.onSubmit)}>
              <TextField required name='regNum' label='Regiment Number' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ required: true, minLength: 6, maxLength: 6, type: "number", pattern: /^[0-9]+$/i })}/>
              {errors.regNum && errors.regNum.type === 'required' && (<p className={classes.paragraphColor}>Regiment Number is required</p>)}
              {errors.regNum && errors.regNum.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
              {errors.regNum && errors.regNum.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
              {errors.regNum && errors.regNum.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid regiment number</p>)}
              <br />
              <Button type='submit' color='primary' variant='contained'>Search<SearchIcon /></Button>               
            </form>
          </CardContent>        
        </Card>
      </div>
    </React.Fragment>    
  );
}