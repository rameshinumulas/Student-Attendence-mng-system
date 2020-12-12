import React,{useEffect} from 'react'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

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


const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 700,
    },
    tablemarginTop:{
        marginTop:theme.spacing(20),
        [theme.breakpoints.up('sm')]:{
        margin:theme.spacing(2),
        marginTop:theme.spacing(15)
    }
    },
    insertButton:{
        // marginLeft:theme.spacing(2)
    }
  }));

export default function Teacher_records() {
    const classes = useStyles()

      const Teachers_state = useSelector(state => state.Te_data)
      console.log(Teachers_state,"ttttt");
      const dispatch = useDispatch()

    useEffect(async() => {

      try {
       const getdata = await axios.get("http://localhost:7000/get/teachers_records")
       console.log(getdata.data.details,"uuu");
       const mainData = getdata.data.details
       dispatch({type:'TEACHER_RECORDS',payload:mainData})
      } catch (error) {
        console.log(error);
      }
    
    }, [])

    const data = [
        {
                firstname:'ramesh',
                lastname:"inumula",
                DOB:" 01/02/1999",
                gender: "male",
                email:"inumularamesh@gmail.com",
                mobile: 7285978169,
                address:"vizianagaram",
                degree:"Msc",
                salary:20000,
                action:{update:"Update",delete:"Delete"}
        },  {
            firstname:'ramesh',
            lastname:"inumula",
            DOB:" 01/02/1999",
            gender: "male",
            email:"inumularamesh@gmail.com",
            mobile: 7285978169,
            address:"vizianagaram",
            degree:"PhD",
            salary:19000,
            action:{update:"Update",delete:"Delete"}
    }
            ]

    return (
        <div className={classes.tablemarginTop}>
            <Button variant="contained" color="secondary" classfirstname={classes.insertButton}>+ insert</Button>
            <TableContainer component={Paper}>
                <Table classfirstname={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>firstname</StyledTableCell>
                        <StyledTableCell>Lastname</StyledTableCell>
                        <StyledTableCell align="center">DOB</StyledTableCell>
                        <StyledTableCell align="center">Gender&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Mobile&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">degree&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">salary&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Address&nbsp;</StyledTableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Teachers_state.map((row) => (
                        <StyledTableRow key={row.firstname}>
                        <StyledTableCell component="th" scope="row">
                            {row.firstname}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.lastname}</StyledTableCell>
                        <StyledTableCell align="right">{row.DOB}</StyledTableCell>
                        <StyledTableCell align="right">{row.gender}</StyledTableCell>
                        <StyledTableCell align="right">{row.email}</StyledTableCell>
                        <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                        <StyledTableCell align="right">{row.degree}</StyledTableCell>
                        <StyledTableCell align="right">{row.salary}</StyledTableCell>
                        <StyledTableCell align="right">{row.address}</StyledTableCell>
                        <StyledTableCell align="right" style={{display:"flex"}}>
                            <Button variant="contained" color="secondary">Update</Button>
                            <Button variant="contained" 
                            style={{backgroundColor:"#28CE22",color:"#FFFFFF"}}>Delete</Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>  
        </div>
    )
}
