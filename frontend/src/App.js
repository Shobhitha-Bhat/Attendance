import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Login } from "./Components/Login.js";
import { ParentDashboard } from "./Components/ParentDashboard.js";
import { FacultyDashboard } from "./Components/FacultyDashboard.js";
import AcademicsPage from './SubComponents/AcademicsPage.js'
import NotifyParentPage from './SubComponents/NotifyParentPage.js'
import NotifyParentCard from './SubComponents/NotifyParentCard.js'
import StudentProfilePage from './SubComponents/StudentProfilePage.js'
import ExtraCurricularPage from './SubComponents/ExtraCurricularPage.js'
import Axios from "axios"
import { Signup } from "./Components/Signup.js";
import { ParentInbox } from "./SubComponents/ParentInbox.js";
import { IAAttendance } from "./SubComponents/IAAttendance.js";
import { MarkAttendance } from "./SubComponents/MarkAttendance.js";
import NotifyFacultyPage from './SubComponents/NotifyFacultyPage.js'
import NotifyFacultyCard from './SubComponents/NotifyFacultyCard.js'
import { FacultyInbox } from "./SubComponents/FacultyInbox.js";
import { FacultyProvider } from "./contexts/FacultyContext.js";
import {SectionOption} from "./SubComponents/SelectSection.js"
import { SectionButtons } from "./SubComponents/AttendanceSections.js";
import { IADasboard } from "./SubComponents/iaattendance_dashboard.js";
import { Subjects } from "./SubComponents/subject_dashboard.js";
import { SubjectMarks } from "./SubComponents/Section_Subject_Marks.js";

function App() {
  
  const [userType, setUserType] = useState("");
  const [isloggedin,setisloggedin] =useState(JSON.parse(localStorage.getItem("loginstatus")) || false)
  const [data,setdata]=useState("") //data from backend

  const userLogin = (type) => {
    setUserType(type);
    setisloggedin(true)
    localStorage.setItem("UserType",JSON.stringify(type))
  };


  const setUserData = (data) => {
    setisloggedin(true)
localStorage.setItem("loginstatus",JSON.stringify(true))
    
    localStorage.setItem("LoginData", JSON.stringify(data));
  };

  const logout = () => {
    localStorage.clear();
    setUserType(null);
    setisloggedin(false)
  };



useEffect(() => {
  const storedusertype = JSON.parse(localStorage.getItem("UserType"))
  const login =JSON.parse(localStorage.getItem("loginstatus"))
  if(isloggedin && storedusertype){
  setisloggedin(true)
  setUserType(storedusertype);
  }else{
   setisloggedin(false)
  }
  }
, [isloggedin])







// const getData=async()=>{
//   const response=await Axios.get("http://localhost:8000/getfacultydata")
  
//   console.log("api response",response.data)
//   setdata(response.data)

// }




useEffect(()=>{
  // getData();
},[])


  return (
    <FacultyProvider>

    <BrowserRouter>
    {/* <h1>{data.msg}</h1>
    <p>{JSON.stringify(data.data)}</p> */}
      <Routes>
        {/* Render login form as the default view when someone opens the app */}
        <Route
          path="/"
          element={
            <Login
            userType={userType}
            userLogin={userLogin}
            setUserData={setUserData}
            />
            
            
            
          }
          />
        <Route
          path="/parentDashboard"
          element={
            userType === "parent" ? (
              <ParentDashboard logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
          />
        <Route
          path="/facultyDashboard"
          element={
            userType === "faculty" ? (
              <FacultyDashboard logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
          />
      
      <Route path="/notifyparentcard" element={<NotifyParentCard logout={logout}/>} />
      <Route path="/notifyfacultycard" element={<NotifyFacultyCard logout={logout}/>} />

        <Route path="/notifyparentpage" element={<NotifyParentPage />} />
        <Route path="/notifyfacultypage" element={<NotifyFacultyPage />} />

        <Route path="/academicspage" element={<AcademicsPage />} />
        <Route path="/extracurricularpage" element={<ExtraCurricularPage />} />
        <Route path="/studentprofilepage" element={<StudentProfilePage />} />
        <Route path="/signup" element={<Signup  />}/>
        <Route path="/parentinbox" element={<ParentInbox/>}/>
        <Route path="/facultyinbox" element={<FacultyInbox/>}/>
        <Route path="/selectsection" element={<SectionOption logout={logout}/> }/>
        <Route path="/iaattendance" element={<IAAttendance logout={logout}/>}/>
        <Route path="/markattendance" element={<MarkAttendance/>}/>
        <Route path="/sectionbuttons" element={<SectionButtons logout={logout}/>}/>
        <Route path="iaattendance_dashboard" element={<IADasboard logout={logout}/>}/>
        <Route path="/subjectdashboard" element={<Subjects logout={logout}/>}/>
        <Route path = "/showsubjectmarks" element={<SubjectMarks logout={logout}/>}/>
          {/* <Route path="/login" element={<Login userType={userType}
                userLogin={userLogin}
                setUserData={setUserData} />}/> */}
      </Routes>
    </BrowserRouter>
                </FacultyProvider>
  );
}

export default App;
