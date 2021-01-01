import axios from 'axios'
import React,{useState,useEffect} from 'react'

import { TextField,MenuItem,Paper, Container, makeStyles,Button, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import Input from '@material-ui/core/Input';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
const useStyles = makeStyles(theme=>({
    rootAttendence:{
        display:"flex",
        // alignItems:"center",
        marginLeft:theme.spacing(10),
        marginTop:theme.spacing(10)
    },
    paperAttendence:{
        marginTop:theme.spacing(5)
    }
}))


export default function DublicateAtt() {
    const classes = useStyles()
    const initialState ={
        groups_of_student: [],
        nameAndroll_no:[],
        branch_name:'',
        stu_name:"",
        stu_roll_no:'',
        Absent:"",
        present:''
    }
    const [attendence, setattendence] = useState(initialState)
    useEffect(async()=>{
        const getdata_of_students = await axios.get('http://localhost:7000/get/fields/for_attendence')
        console.log(getdata_of_students.data.fields_of_students,"aaaaaaaaaa");
        const total_data = getdata_of_students.data.fields_of_students
        total_data.map(each=>{
            setattendence((attendence)=>
            ({...attendence,groups_of_student:[...attendence.groups_of_student,
                each._id.program]}))
                const name_of_stu = {
                    program:each._id.program,
                    name:each._id.name,
                    roll:each._id.roll_no
                }
            setattendence((attendence)=>
            ({...attendence,nameAndroll_no:[...attendence.nameAndroll_no,name_of_stu,]}))
        })
    },[])
    // console.log(attendence,"lalalalalalalalal");

    const get_Branchname = (e)=>{
        console.log(e.target.value);
        setattendence({...attendence,branch_name:e.target.value})
    }
    const groupList = new Set([])
    const totalDetails = attendence.groups_of_student.map(group=>groupList.add(group))
   
    const filterItems = attendence.nameAndroll_no.filter(item=>item.program === attendence.branch_name)
    
    console.log(totalDetails,"ffff");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    const onHanleAttendece = (e)=>{
        setattendence({...attendence,[e.target.name]:[e.target.value]})
        console.log(attendence,"total attend");
    }
    return (
        <div >
            <Container maxWidth="sm">
            <div className={classes.rootAttendence}>
                <Paper >
                  <Typography variant="h6"> Date:-{today}</Typography>
                </Paper>
            <TextField
                    id="standard-select-currency"
                    select
                    label="Select branch of student"
                    name="branch_name"
                    value={attendence.branch_name}
                    onChange={get_Branchname}
                    variant="outlined"
                    size="small"
                    style={{width:'80%'}}
                    >
                    {[...groupList].map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
            </TextField> <br />
            </div>
            <form className={classes.root} noValidate autoComplete="off" >
            {filterItems.map(eachField=><div>
                <Input 
                inputProps={{ 'aria-label': 'description' }}
                 onChange={onHanleAttendece} 
                value={eachField.roll}
                 name={eachField.roll} />
                <Input
                inputProps={{ 'aria-label': 'description' }} 
                onChange={onHanleAttendece} 
                value={eachField.name}
                name={eachField.name} />
                </div>)}
            </form>
            
            <Button variant="contained" color="secondary" fullWidth >Save</Button>
        </Container>

        </div>
    )
}
