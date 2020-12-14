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

  
export default function New_subject(props) {
  const [ismodal, setismodal] = useState(false)
  console.log(props,"ttttttt");
    const classes = useStyles()
    let history = useHistory();
    const initialState = {
        subject_name:"",
        teacher_name:"",
        semester:"",
        field:"",
        sub_teacher_name:[]
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
    const handle_new_subject =async()=>{
        console.log(record);
        
        const newstu_record =await axios.post('http://localhost:7000/post/subject_post',record)
        console.log(newstu_record,"mmmm");
        history.push('/Subjects')

    }
    // console.log(window.location.pathname,"lllllllllll");
    React.useEffect(async() => {
        if(window.location.pathname){
            setismodal(true)
        }else{
            setismodal(false)
        }
        const sub_teachers= await axios.get("http://localhost:7000/get/sub_teacher")
        console.log(sub_teachers.data.sub_teacher_query,record.sub_teacher_name);
        sub_teachers.data.sub_teacher_query.map(each=>{
            setrecord((record)=>
            ({...record,sub_teacher_name:[...record.sub_teacher_name,
                `${each._id.firstname} ${each._id.lastname}`]})
        )})
        console.log(record.sub_teacher_name);
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
                  <DialogTitle id="alert-dialog-title">{"Insert subject"}</DialogTitle>
                  <DialogContent  className={classes.modalTop}>
                  {/* <Student_new_record modalprops={modalClose} />     */}
            
            <Container maxWidth="sm" className="st_reg_cont">
            {/* <Typography variant="h4" >Insert new Student record</Typography> */}
            <Grid container>   
                <Grid item xs={6} className="input_grids">
                <TextField
                    id="standard-select-currency"
                    select
                    label="Subject name"
                    name="subject_name"
                    value={record.subject_name}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {["mathematics","Pysics","chemistry","computer science"].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField> <br />
                </Grid>
                <Grid item xs={6} className="input_grids">
                <TextField
                    id="standard-select-currency"
                    select
                    label="Teacher name"
                    name="teacher_name"
                    value={record.teacher_name}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {record.sub_teacher_name.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField> <br />
                </Grid>
                <Grid item xs={6} className="input_grids">
                <TextField
                    id="standard-select-currency"
                    select
                    label="Semester"
                    name="semester"
                    value={record.semester}
                    onChange={handleInputfields}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {["1st","2nd","3rd","4th","5th","6th"].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField> <br />
                </Grid>
                <Grid item xs={6} className="input_grids">
                <TextField
                    id="standard-select-currency"
                    select
                    label="Field"
                    name="field"
                    value={record.field}
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
                
                     <Button variant="contained" 
                     onClick={handle_new_subject}
                     style={{backgroundColor:"#28CE22",color:"#FFFFFF"}}
                   >Save</Button>
                    <Link to="/Subjects" style={{textDecoration:"none"}}> 
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
