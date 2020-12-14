import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';


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
    const [deleteResponce, setdeleteResponce] = useState(false)


      const Teachers_state = useSelector(state => state.Te_data)
      console.log(Teachers_state,"ttttt");
      const dispatch = useDispatch()

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
       const getdata = await axios.get("http://localhost:7000/get/teachers_records")
       console.log(getdata.data.details,"uuu");
       const mainData = getdata.data.details
       var tdata = mainData;
      //  console.log('data-->'+JSON.stringify(tdata))
        var slice =
         tdata.slice(tablepage.offset,
            tablepage.offset + tablepage.perPage)
      settablepage({
        ...tablepage,
           pageCount: Math.ceil(tdata.length / tablepage.perPage),
           orgtableData : tdata,
           tableData:slice
       })
       dispatch({type:'TEACHER_RECORDS',payload:mainData})
      } catch (error) {
        console.log(error);
      }  
    },[])

    const deleteStudent_record = async(id)=>{
      console.log(id,"deleteeeee");
      const deleteData = await axios.delete(`http://localhost:7000/delete_teacher/${id}`)
     console.log((deleteData.data.delete));
      setdeleteResponce(deleteData.data.delete)
    }

    React.useEffect(async()=>{
      const delete_getdata = await axios.get('http://localhost:7000/get/teachers_records')
     
      console.log(delete_getdata.data.details,"iii");
      var tdata = delete_getdata.data.details;
      //  console.log('data-->'+JSON.stringify(tdata))
        var slice = tdata.slice(tablepage.offset,
            tablepage.offset + tablepage.perPage)
      settablepage({
        ...tablepage,
           pageCount: Math.ceil(tdata.length / tablepage.perPage),
           orgtableData : tdata,
           tableData:slice
       })
      dispatch({type:'STUDENTS_RECORDS',payload:delete_getdata.data.details})
      setdeleteResponce(false)
      // console.log(state.data,"stattttttttttttttttttttttttttttttttttt");
      
    },[deleteResponce])


    return (
        <div className={classes.tablemarginTop}>
            <Link to ="new_teacher" style={{textDecoration:"none"}}>
            <Button variant="contained" color="secondary" 
             classfirstname={classes.insertButton}>+ insert</Button>
             </Link>
            <TableContainer component={Paper}>
                <Table classfirstname={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Roll no</StyledTableCell>
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
                    {tablepage.tableData.map((row) => (
                        <StyledTableRow key={row.firstname}>
                        <StyledTableCell component="th" scope="row">
                            {row.roll_no}
                        </StyledTableCell>
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
                            <Button variant="contained"
                            style={{backgroundColor:"#28CE22",color:"#FFFFFF"}}>Update</Button>
                            <Button variant="contained"  color="secondary"
                            onClick={()=>deleteStudent_record(row._id)}
                            >Delete</Button>
                        </StyledTableCell>
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
