import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useForm, Controller } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

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
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function SearchByOtherCriteriaForm(props) {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [positions, setPositions] = useState();
  //const [position, setPosition] = useState('');
  
 /*  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  } */
  
  useEffect(() => {
    const getPositions = async () => {
      const info = await Axios.get("GetInfo/GetAllPositions");
      if(info.data != null){
        if(info.data.length > 0){
          setPositions(info.data);
        }
      }
    };
    
    getPositions();
  }, []);
  //console.log(position);
  const showInfo = () => {
    if(positions != null){
      if(positions.length > 0){
        return (
          <React.Fragment>
            <div>
              <Card>        
                <CardContent className={classes.cardcontents}>          
                  <form align='center' onSubmit={handleSubmit(props.onSubmit)}>
                    <TextField name='employeeFname' label='First Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register}/>
                    <br />
                    <TextField name='employeeLname' label='Last Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register}/>
                    <br />
                    <FormControl>
                      <InputLabel htmlFor="position">Rank</InputLabel>
                      <Controller
                        control={control}
                        name="employeePosition"
                        as={
                          <Select 
                            id="position" 
                            variant='outlined' 
                            margin='normal'
                            className={classes.formControl}>
                            {positions.map((position) => (
                              <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                              ))}
                          </Select>
                        }
                      />
                    </FormControl>
                    <br />
                    <Button type='submit' color='primary' variant='contained'>Search<SearchIcon /></Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </React.Fragment>
        );
      }
    }
  }
  return(
    <div>
      {showInfo()}
    </div>
  );
}