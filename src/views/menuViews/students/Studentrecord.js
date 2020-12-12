import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';



import { withStyles, makeStyles,useTheme  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


import axios from 'axios';
import Student_new_record from './Student_new_record';

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
    
    modalTop:{
      marginTop:theme.spacing(20),
    }
  }));
  const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

export default function Student() {
  const classes = useStyles()

  const [ismodal, setismodal] = useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const state = useSelector(state => state)
      console.log(state.data,"stattttttttttttttttttttttttttttttttttt");
    const dispatch = useDispatch()

    
      useEffect(async() => {

        try {
         const getdata = await axios.get("http://localhost:7000/get/stu_records")
         console.log(getdata.data.details,"uuu");
         const mainData = getdata.data.details
         dispatch({type:'STUDENTS_RECORDS',payload:mainData})
        } catch (error) {
          console.log(error);
        }
      }, [])

    const modalClose = ()=>{
      setismodal(false)
    }
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    return (
        <div className={classes.tablemarginTop}>
            <Button variant="contained" color="secondary"
             className={classes.insertButton} onClick={()=>setismodal(true)}>+ insert</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Student Name</StyledTableCell>
                        <StyledTableCell align="center">DOB</StyledTableCell>
                        <StyledTableCell align="center">Gender&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Mobile&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Address&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Session&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Program&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.DOB}</StyledTableCell>
                        <StyledTableCell align="right">{row.gender}</StyledTableCell>
                        <StyledTableCell align="right">{row.email}</StyledTableCell>
                        <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                        <StyledTableCell align="right">{row.address}</StyledTableCell>
                        <StyledTableCell align="right">{row.session}</StyledTableCell>
                        <StyledTableCell align="right">{row.program}</StyledTableCell>
                        <StyledTableCell align="right" style={{display:"flex"}}>
                            <Button variant="contained" color="secondary">Update</Button>
                            <Button variant="contained" style={{backgroundColor:"#28CE22",color:"#FFFFFF"}}  >Delete</Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={10}
                          count={state.data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>  

                <Modal
                 isOpen={ismodal}
                onRequestClose={()=>setismodal(false)}
                style={customStyles}
                // className={classes.modalTop}
                 >
                      {/* <div > */}
                        <Student_new_record modalprops={modalClose} />
                      {/* </div> */}
                </Modal>
        </div>
    )
}


