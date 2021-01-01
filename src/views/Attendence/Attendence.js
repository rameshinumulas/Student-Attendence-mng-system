import axios from 'axios'
import React,{useState,useEffect} from 'react'

import { TextField,MenuItem,Paper, Container, makeStyles,Button, Typography, Select, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {Radio, RadioGroup} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    },
    formcontrol:{
        maxWidth:'500px'
    }
}))


export default function Attendence() {
    const classes = useStyles()
    const initialState ={
        groups_of_student: [],
        nameAndroll_no:[],
        branch_name:''
    }
    const [atte_value_ab, setatte_value_ab] = useState('')
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
   
    const filterItems = attendence.nameAndroll_no.filter(item=>
        item.program === attendence.branch_name)
    
    console.log(filterItems,"ffff");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    const handleRadio_ab = (event,roll_no,name)=>{
        console.log(event.target.name,"eee",roll_no);
        // const newDic = {
        //     roll:roll_no,
        //     name:name,
        //     absent:event.target.value
        // }
        filterItems.map(one=>{
            if(one.roll=== roll_no){
            one["attendence"]=event.target.value
            one["date"] =today 
            setatte_value_ab(event.target.value)
            }
        })
        // console.log(newDic,"j");     
    }
    const handleSaveAbsent=async()=>{
        console.log(filterItems,"save");
        setattendence({...attendence,
            nameAndroll_no:[],
            branch_name:''})
        const getAttendeceResult = await axios.post('http://localhost:7000/store/attendence',filterItems)
        console.log(getAttendeceResult,"att");
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
            
            <TableContainer component={Paper}>
                <Table classfirstname={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Roll no</StyledTableCell>
                        <StyledTableCell align="center">Name of the student</StyledTableCell>                       
                        <StyledTableCell align="center">Attendence</StyledTableCell>  
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filterItems.map((row) => (                    
                        <StyledTableRow>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.roll}
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell>
                             {/* <TextField
                                id="standard-select-currency"
                                select
                                label="Attendence"
                                name="attendence"
                                value={atte_value_ab} 
                                onChange={(event)=>handleRadio_ab(event,row.roll)}
                                variant="outlined"
                                size="small"
                                style={{width:'80%'}}
                            >
                            {[row.absent,row.present].map((option) => (
                               
                            <MenuItem key={row.roll} value={option}>
                            {option}
                            </MenuItem>
                            ))}
                        </TextField>  */}
                        <FormControl fullWidth >
                        <InputLabel>Attendence</InputLabel>
                        <Select 
                        onChange={(event)=>handleRadio_ab(event,row.roll,row.name)}
                        >
                            <MenuItem value="absent">Absent</MenuItem>
                            <MenuItem value="present">present</MenuItem>
                        </Select>
                        </FormControl>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
                    <Button variant="contained"
                    onClick={handleSaveAbsent} color="secondary" fullWidth  >Save</Button>
        </Container>

        </div>
    )
}

