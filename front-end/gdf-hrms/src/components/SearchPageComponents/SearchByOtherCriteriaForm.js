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

export default function SearchByOtherCriteriaForm(props) {
  const classes = useStyles(); 

  const { register, handleSubmit, errors } = useForm();
 // const onSubmit = data => console.log(data);

  return (
    <React.Fragment>
      <div>
        <Card>        
          <CardContent className={classes.cardcontents}>          
            <form className={classes.form} align='center' onSubmit={handleSubmit(props.onSubmit)}>
              <TextField name='fName' label='First Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ maxLength: 25 })}/>
              {errors.fName && errors.regNum.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters required</p>)}
              <br />
              <TextField name='lName' label='Last Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ maxLength: 25 })}/>
              {errors.lName && errors.regNum.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters required</p>)}
              <br />
              <TextField name='position' label='Rank' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ maxLength: 25 })}/>
              {errors.rank && errors.regNum.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters required</p>)}
              <br />
              <Button type='submit' color='primary' variant='contained'>Search<SearchIcon /></Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}