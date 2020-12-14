import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Modal from 'react-modal';

import{ Link } from 'react-router-dom';

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

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


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


import axios from 'axios';
import Student_new_record from './Student_new_record';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const useStyles = makeStyles((theme)=>({
  tablemarginTop:{
    marginTop:theme.spacing(20),
    [theme.breakpoints.up('sm')]:{
      margin:theme.spacing(2),
      marginTop:theme.spacing(15)
  }
  },
    modalTop:{
      // marginTop:theme.spacing(20),
    },
    dialog:{
      marginTop:theme.spacing(0),
    }
  }));
  const customStyles = {
    content : {
      position: "relative",
      top                   : '40%',
      left                  : '50%',
      // right                 : 'auto',
      // bottom                : 'auto',
      // marginRight           : '-50%',
      
      // transform             : 'translate(-50%, -50%)'
    }
  };
 
  
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "lightslategray"
        }
      }
    }
  })
export default function Student() {
  const classes = useStyles()


const [deleteResponce, setdeleteResponce] = useState(false)
    const state = useSelector(state => state)
    const history = useHistory()
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

    // const modalClose = ()=>{
    //   setismodal(false)
    // }
   
    const updateStudent=()=>{
      history.push(`/update`,state.data)
    }
    const columns = [
      {
        name: "roll_no",
        label: "Roll no",
        options: {
         filter: true,
         sort: true,
        }
       },
      {
       name: "name",
       label: "Student Name",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "email",
       label: "Email",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "mobile",
       label: "contact number",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "gender",
       label: "Gender",
       options: {
        filter: true,
        sort: false,
       }
      }, {
        name: "address",
        label: "Address",
        options: {
         filter: true,
         sort: false,
        }
       },
      {
        name: "DOB",
        label: "Date of birth",
        options: {
         filter: false,
         sort: false,
        }
       },
       {
            name: "session",
            label: "study period",
            options: {
             filter: false,
             sort: false,
            }
           },
           {
            name: "program",
            label: "Program",
            options: {
             filter: true,
             sort: false,
            }
           },
           {
            name: "name",
            label: "Update",
            options: {
            customBodyRender: (value) => {
              return (
                // <div style={{display:"flex"}}>
                // <Link to ="update">
                <Button  
                style={{backgroundColor:"#28CE22",color:"#FFFFFF"}}
                  variant="contained"
                  onClick={updateStudent}
                >Update</Button>
                // </Link>
              // </div>
                )
              }
            }
          },
            {
              name: "_id",
              label: "Delete",
              options: {
              customBodyRender: (value) => {
                return (
                  <Button 
                  color="secondary"
                  variant="contained"
                  onClick={()=>deleteStudent_record(value)}
                  >Delete</Button>
                  )
                }
              }
          }
     ];
     
   
     const options = {
      selectableRows: false,
      filter: true,
      search: true,
      download:true
      //  filterType: 'checkbox',
     };
      
    const deleteStudent_record = async(id)=>{
      console.log(id,"deleteeeee");
      const deleteData = await axios.delete(`http://localhost:7000/delete_student/${id}`)
     console.log((deleteData.data.delete));
      setdeleteResponce(deleteData.data.delete)
    }

    React.useEffect(async()=>{
      const delete_getdata = await axios.get('http://localhost:7000/get/stu_records')
      // .then(res=>(
      //   // console.log(res.data.details,"a")

      // )
      //   )
      // .catch(err=>console.log(err))
      console.log(delete_getdata.data.details,"iii");
        dispatch({type:'STUDENTS_RECORDS',payload:delete_getdata.data.details})
      setdeleteResponce(false)
      console.log(state.data,"stattttttttttttttttttttttttttttttttttt");
      
    },[deleteResponce])
    

    return (
        <div className={classes.tablemarginTop}>
            <Link to = "/new_student" style={{textDecoration:"none"}}> <Button variant="contained" color="secondary"
             className={classes.insertButton}
              // onClick={()=>setismodal(true)}
              >+ insert</Button>
              </Link>
          <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                title={"Student records"}
                data={state.data}
                columns={columns}
                options={options}
              />
          </MuiThemeProvider>


              <div>
               
              </div>
        </div>
    )
}


