import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    Button:{
        marginTop:theme.spacing(10)
    }
}))

export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.Button}>
           <Link to='/studentEntry' >
               <Button variant="contained">Entries</Button>
            </Link>
        </div>
    )
}
