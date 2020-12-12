import { Button, makeStyles } from '@material-ui/core'
import React,{useState} from 'react'
import { Grid,Typography, Container,TextField} from '@material-ui/core';
import axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles(theme=>({
    Insert_records:{
        // backgroundColor:"#99FFFF",
        marginTop:theme.spacing(15),

    },
}))
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
export default function Student_new_record(props) {
    const classes = useStyles()
    const initialState = {
        name:'',
        DOB:'',
        gender:'',
        email:'',
        address:'',
        mobile:"",
        session:"",
        program:'',
    }
    const [record, setrecord] = useState(initialState)
    const handleInputfields = (e)=>{
        // console.log(e.target.value,"eeeeeeeeeee",e.target.name);
        setrecord({...record,
        [e.target.name]:e.target.value})
        // console.log(record,"sssss");
    }
    const hanleNewrecord =()=>{
        console.log(record);
        const newstu_record = axios.post('http://localhost:7000/student_records',record)
        console.log(newstu_record);
    }
    return (
        <div className={classes.Insert_records}>
            <Container maxWidth="sm" className="st_reg_cont">
            <Typography variant="h4" >Insert new Student record</Typography>
            <Grid container>
                {['name',"address","email","session",].map(item=>
                <Grid item xs={6} className="input_grids">
                <TextField
                    name={item}
                    label={item}
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    onChange={handleInputfields}
                />
                 
                </Grid>
                    )}
                    <Grid item xs={6}  className="input_grids">
                    <TextField
                        id="date"
                        label="DOB"
                        type="date"
                        name="DOB"
                        defaultValue="dd-mm-yy"
                        variant="outlined"
                        size="small"
                        style={{width:'80%'}}
                    onChange={handleInputfields}


                        // className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
             
                </Grid>
                <br />
                <Grid item xs={6}  className="input_grids">
                <TextField
                        id="number"
                        name="mobile"
                        label="mobile number"
                        type="number"
                        variant="outlined"
                        size="small"
                        // className={classes.textField}
                    onChange={handleInputfields}
                       
                    /> 
                </Grid>
                <br />
                <Grid item xs={6}  className="input_grids">
                <TextField
                    id="standard-select-currency"
                    select
                    label="gender"
                    name="gender"
                    value={record.gender}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {["male","female"].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField>
            <br /> 
                </Grid>
                <Grid item xs={6}>
                <TextField
                    id="standard-select-currency"
                    select
                    label="program"
                    name="program"
                    value={record.program}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {["BSc","B.A","MSC","MBA","BCOM","CBZ"].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField> <br />
                </Grid>
                   
                    <Button variant="contained" color="secondary" onClick={props.modalprops}>Cancel</Button>
                    <Button variant="contained"  style={{backgroundColor:"#28CE22",color:"#FFFFFF"}} onClick={hanleNewrecord}>Save</Button>      
                </Grid>
                </Container>

            </div>
        )
}
