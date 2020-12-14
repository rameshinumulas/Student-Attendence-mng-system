import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Adminmenu from '../Admincomponents/Adminmenu'
import Login from '../views/Authpages/Login'
import Menubar from '../views/Menubar'
import Entries from '../views/menuViews/Entries'
import Home from '../views/menuViews/homes/Home'
import Student from '../views/menuViews/students/Studentrecord'
import StudentRegistration from '../views/menuViews/students/StudentRegistration'
import Student_new_record from '../views/menuViews/students/Student_new_record'
import Stu_update from '../views/menuViews/students/Stu_update'
import New_subject from '../views/menuViews/SubjectsDetails/New_subject'
import Subject_records from '../views/menuViews/SubjectsDetails/Subject_records'
import New_Teacher from '../views/menuViews/teachers/new_teacher'
import Teacher_records from '../views/menuViews/teachers/Teacher_records'

export default function Routsfile() {
    return (
        <div>
            <Switch>
                {/* <Route exact path='/' component={Menubar} /> */}
                {/* <Route exact path="/" component={Adminmenu} /> */}
                {/* <Route exact path = "/entries" component={Entries} /> */}
                <Route exact path = "/login" component={Login} />
                <Route exact path = "/Students" component={Student} />
                <Route exact path = "/Home" component={Home} />
                <Route exact path = "/studentEntry" component={StudentRegistration} />
                <Route exact path = "/Teachers" component={Teacher_records} />
                <Route exact path = "/Subjects" component={Subject_records} />
                <Route exact path ="/new_student" component={Student_new_record} />
                <Route exact path ="/new_teacher" component={New_Teacher} />
                <Route exact path = "/update" component={Stu_update}/>
                <Route exact path = "/new_subject" component={New_subject}/>
            </Switch> 
        </div>
    )
}

