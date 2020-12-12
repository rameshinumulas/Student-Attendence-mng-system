import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { Container,Grid,Typography } from '@material-ui/core';
const useStyles = makeStyles((theme)=>({
    studentRegistration_form:{
        // backgroundColor:"#99FFFF",
        marginTop:theme.spacing(15),

    },
    inputGrids:{
    }
}));
export default function StudentRegistration() {
    const classes = useStyles()


    const handleInputfields = (e)=>{
        
    }
    return (
        <div className={classes.studentRegistration_form}>
        <Container maxWidth="sm" className="st_reg_cont">
            <Typography variant="h3" >Student Registration </Typography>
            <Grid container>
                {['name',"gender","dob","address","email","mobile","session","program"].map(item=>
                <Grid item xs={6} className="input_grids">
                <TextField
                    name={item}
                    label={item}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    onChange={handleInputfields}
                /><br />
                </Grid>
                    )}        
        </Grid>
        </Container>
        </div>
    )
}
