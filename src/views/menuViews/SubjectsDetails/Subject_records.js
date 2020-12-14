import React,{useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
 
    const initialState ={
              offset: 0,
              tableData: [],
              orgtableData: [],
              perPage: 10,
              currentPage: 0
      }

      const [tablepage, settablepage] = React.useState(initialState)

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * tablepage.perPage;
        console.log(e,offset,selectedPage);
        settablepage((tablepage)=>({
          ...tablepage,
            currentPage: selectedPage,
            offset: offset
        }));
        console.log(e,offset,selectedPage,tablepage.currentPage,tablepage.offset);
        loadMoreData()
    };

    const loadMoreData=()=>{
      const data = tablepage.orgtableData;
  
          const slice = data.slice(tablepage.offset,
             tablepage.offset +
               tablepage.perPage)
      console.log("loadmoredaa",slice);

      settablepage((prevState)=>({
        ...prevState,
        pageCount: Math.ceil(data.length / tablepage.perPage),
        tableData:slice
      }))
    }

    useEffect(async() => {

      try {
       const getdata = await axios.get("http://localhost:7000/get/subjects")
       console.log(getdata.data.get_data,"uuu");
       const tdata = getdata.data.get_data
      //  var tdata = mainData;
      //  console.log('data-->'+JSON.stringify(tdata))
        var slice =
         tdata.slice(tablepage.offset,
            tablepage.offset + tablepage.perPage)
      settablepage((tablepage)=>({
        ...tablepage,
           pageCount: Math.ceil(tdata.length / tablepage.perPage),
           orgtableData : tdata,
           tableData:slice
       }))
      //  dispatch({type:'TEACHER_RECORDS',payload:mainData})
      } catch (error) {
        console.log(error);
      }  
    },[])


    return (
        <div className={classes.tablemarginTop}>
            <Link to="/new_subject" style={{textDecoration:"none"}}>
            <Button variant="contained" color="secondary" className={classes.insertButton}>+ insert</Button>
            </Link>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Subject No</StyledTableCell>
                        <StyledTableCell align="center">Subject name&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Teacher name&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Filed&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Semester&nbsp;</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tablepage.tableData.map((row) => (
                        <StyledTableRow key={row.subject_no}>
                        <StyledTableCell >
                            {row.roll_no}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.subject_name}</StyledTableCell>
                        <StyledTableCell align="center">{row.teacher_name}</StyledTableCell>
                        <StyledTableCell align="center">{row.filed}</StyledTableCell>
                        <StyledTableCell align="center">{row.semester}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>  
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={tablepage.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </div>
    )
}


