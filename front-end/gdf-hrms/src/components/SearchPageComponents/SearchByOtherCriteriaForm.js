import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, errors } = useForm();
  const [positions, setPositions] = useState();
  const [position, setPosition] = useState("");

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  }
  
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
  const showInfo = () => {
    if(positions != null){
      if(positions.length > 0){
        return (
          <React.Fragment>
            <div>
              <Card>        
                <CardContent className={classes.cardcontents}>          
                  <form className={classes.form} align='center' onSubmit={handleSubmit(props.onSubmit)}>
                    <TextField name='fName' label='First Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ required: true, maxLength: 25 })}/>
                    {errors.fName && errors.fName.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters only!</p>)}
                    {errors.fName && errors.fName.type === 'required' && (<p className={classes.paragraphColor}>First name is required!</p>)}
                    <br />
                    <TextField name='lName' label='Last Name' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ required: true, maxLength: 25 })}/>
                    {errors.lName && errors.lName.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters only!</p>)}
                    {errors.lName && errors.lName.type === 'required' && (<p className={classes.paragraphColor}>Last name is required!</p>)}
                    <br />
                    {/* <TextField name='position' label='Rank' variant='outlined' margin='normal' defaultValue={''} inputRef={register({ required: true, maxLength: 25 })}/>
                    {errors.position && errors.position.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 25 characters only!</p>)}
                    {errors.position && errors.position.type === 'required' && (<p className={classes.paragraphColor}>First name is required!</p>)} */}
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="position-label">Rank</InputLabel>
                      <Select
                        labelId="position-label"
                        id="position"
                        value={position}
                        onChange={handlePositionChange}
                        label="Rank"
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {positions.map((position) =>
                          <MenuItem key={position.id} value={position.name}>{position.name}</MenuItem>
                        )}
                      </Select>
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