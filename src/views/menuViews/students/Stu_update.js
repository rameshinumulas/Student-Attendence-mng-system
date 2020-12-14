import React,{useSelector} from 'react'
import Student_new_record from './Student_new_record'

export default function Stu_update(props) {
    // const state = useSelector(state => state.data)
    console.log(props.location.state,"uuuuuuuuuuuuuuu");
    return (
        <div>
      <Student_new_record state_data={props.location.state} />
        </div>
    )
}
