import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

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
    // table: {
    //   minWidth: 700,
    // },
    tablemarginTop:{
        marginTop:theme.spacing(20),
        [theme.breakpoints.up('sm')]:{
        margin:theme.spacing(15),
        // marginTop:theme.spacing(15)
    }
    },
    insertButton:{
        // marginLeft:theme.spacing(2)
    }
  }));

export default function Subject_records() {
    const classes = useStyles()
    const data = [
        {
            subject_no:1,
            subject_name:"C++",
            teacher_name:'ramesh',
            filed:"BSCs",
            semester:"2nd",
        },  {
            subject_no:1,
            subject_name:"Python",
            teacher_name:'ramesh',
            filed:"BSCs",
            semester:"2nd",
    }
            ]
    return (
        <div className={classes.tablemarginTop}>
            <Button variant="contained" color="secondary" className={classes.insertButton}>+ insert</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Subject No</StyledTableCell>
                        <StyledTableCell align="left">Subject name&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Teacher name&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Filed&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Semester&nbsp;</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.subject_no}>
                        <StyledTableCell >
                            {row.subject_no}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subject_name}</StyledTableCell>
                        <StyledTableCell align="right">{row.teacher_name}</StyledTableCell>
                        <StyledTableCell align="right">{row.filed}</StyledTableCell>
                        <StyledTableCell align="right">{row.semester}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>  
        </div>
    )
}


