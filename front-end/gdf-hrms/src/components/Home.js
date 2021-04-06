import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({

    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(5),
      marginBottom: '50px',
    },
  
    cardcontents: {
      flex: 1,
      float: 'left',
      margin: theme.spacing(5),
    }
}));

export default function HomePage() {
    const classes = useStyles();

    return(
        <div>
            <div className={classes.root}>
                <Card>
                    <CardContent className={classes.cardcontents}>
                        <Typography variant='h2' align='center' gutterBottom >Guyana Defence Force</Typography>
                        <Typography variant='h3' align='center' gutterBottom >Human Resource Management System</Typography>
                    </CardContent>          
                </Card>
            </div>      
        </div>
    );
}