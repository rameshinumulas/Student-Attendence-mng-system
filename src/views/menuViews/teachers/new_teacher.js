import { Button, makeStyles } from '@material-ui/core'
import React,{useState,useSelector,useDispatch} from 'react'
import { Grid,Typography, Container,TextField} from '@material-ui/core';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles(theme=>({
    Insert_records:{
        // backgroundColor:"#99FFFF",
        // marginTop:theme.spacing(15),

    },
}))

  
export default function New_Teacher(props) {
  const [ismodal, setismodal] = useState(false)
  console.log(props,"ttttttt");
    const classes = useStyles()
    let history = useHistory();
    const initialState = {
        firstname:'',
        lastname:'',
        DOB:'',
        gender:'',
        email:'',
        address:'',
        mobile:"",
        degree:'',
    }
const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [record, setrecord] = useState(initialState)

    const handleInputfields = (e)=>{
        // console.log(e.target.value,"eeeeeeeeeee",e.target.name);
        setrecord({...record,
        [e.target.name]:e.target.value})
        // console.log(record,"sssss");
    }
    const handlenew_teacher_record =()=>{
        console.log(record);
        history.push('/Teachers')
        const newteacher_record = axios.post('http://localhost:7000/teachersRecords',record)
        console.log(newteacher_record);

    }
    // console.log(window.location.pathname,"lllllllllll");
    React.useEffect(() => {
        if(window.location.pathname){
            setismodal(true)
        }else{
            setismodal(false)
        }
    }, [])
    
    return (
        <div className={classes.Insert_records}>
             <Dialog
                  fullScreen={fullScreen}
                  open={true}
                  onClose={()=>setismodal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Insert Teacher record"}</DialogTitle>
                  <DialogContent  className={classes.modalTop}>
            
            <Container maxWidth="sm" className="st_reg_cont">
            <Grid container>
                {['firstname',"lastname","email",].map(item=>
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
                    <Grid item xs={6} >
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
                <Grid item xs={6}>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Degree"
                    name="degree"
                    value={record.degree}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {["MSc","PHD","MCA","MBA"].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField> <br />
                </Grid>
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
                <Grid item xs={6}  className="input_grids">
                <TextField
                        id="salary"
                        name="salary"
                        label="Salary"
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
                
                <Grid item xs={6}  className="input_grids">
                    <TextField
                        id="Address"
                        name="address"
                        label="Address"
                        type="text"
                        variant="outlined"
                        size="small"
                        multiline={4}
                        // className={classes.textField}
                    onChange={handleInputfields}      
                    /> 
                    </Grid>

                    <Button variant="contained" 
                     onClick={handlenew_teacher_record}
                     style={{backgroundColor:"#28CE22",color:"#FFFFFF",height:40}}
                   >Save</Button>
                    <Link to="/Teachers" style={{textDecoration:"none"}}> 
                    <Button variant="contained" color="secondary" 
                    >Cancel</Button>
                    </Link> 
                          
                </Grid>
                </Container>

                </DialogContent>
                
                </Dialog>
            </div>
        )
}
