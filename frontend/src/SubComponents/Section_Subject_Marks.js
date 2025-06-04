import React, { useEffect, useState } from "react";
import { FacultyContext } from "../contexts/FacultyContext";
import { useContext } from "react";
import Header from "../Components/Header";
import  Axios  from "axios";
import { Table, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export const SubjectMarks = ({logout})=>{
    const {facultyId} = useContext(FacultyContext)
      const {secname} = useContext(FacultyContext)
      const {subjname} = useContext(FacultyContext)
      const [subfacultyname,setsubfacultyname] = useState("")
      const [sheet, setsheet] = useState([]);
      const [filteredsheet,setfilteredsheet]=useState([])
      const [viewmode,setviewmode]=useState("normal")

     useEffect(()=>{
const fetch_subject_faculty=async(e)=>{
                try{
            let subFacName= await Axios.get(`http://localhost:8000/getsubjectFaculty?subjName=${subjname}`);
            if(subFacName.data && subFacName.data.length >0){
                console.log(subFacName.data)
                setsubfacultyname(subFacName.data)
            }else{
                setsubfacultyname("")
            }
        }
        catch{
            console.log("Error fetching data");
            setsubfacultyname("");
        }
    }

    //get marks of the students of a particular section of a particular subject
    const subject_marks = async(e)=>{
        try{
                let marks_sheet = await Axios.get(`http://localhost:8000/getmarksSheet?subjName=${subjname}&section=${secname}`)
                console.log(marks_sheet)
                setsheet(marks_sheet.data);
        }catch{

        }
    }
    fetch_subject_faculty();
    subject_marks();
},[,secname,subjname])

const filterlowscores = (threshold) => {
  const filtered = sheet.filter(student =>
    student.subject_status.some(sub => sub.marks >= 0 && sub.marks <= threshold)
  );
  setfilteredsheet(filtered);
  setviewmode("filtered");
};


const filtermidscores=(threshold)=>{
  const filtered = sheet.filter(student => {
    return student.subject_status.some(sub => sub.marks > 40 && sub.marks <= threshold)
  });
  setfilteredsheet(filtered);
  setviewmode("filtered");

}

const filterhighscores=(threshold)=>{
  const filtered = sheet.filter(student => { 
    return student.subject_status.some(sub => sub.marks > 70 && sub.marks <= threshold)
  });
  setfilteredsheet(filtered);
  setviewmode("filtered");

}

const showOverview = () => {
  setviewmode("overview");
  setfilteredsheet(sheet);  
};

const resetsheet = () =>{
  setviewmode("normal");
  setfilteredsheet(sheet)
}

    return(
        <>
        <Header logout={logout}/>
           <div className="d-flex justify-content-between align-items-start mt-4 mb-4 px-4">
  <div>
    <h5 className="mb-2">Class Supervisor: {facultyId}</h5>
    <h5 className="mb-2">Section: {secname}</h5>
    <h5 className="mb-2">Subject Faculty: {subfacultyname}</h5>
  </div>
  <div>
  <div>
    <button className="btn btn-danger me-2" onClick={()=>filterlowscores(40)}>Red Band</button>
    <button className="btn btn-warning me-2" onClick={()=>filtermidscores(70)}>Yellow Band</button>
    <button className="btn btn-success me-2" onClick={()=>filterhighscores(100)}>Green Band</button>
    <button className="btn btn-primary me-2" onClick={showOverview}>Overview</button>
  </div>
  <div className="text-center">
    <button className="btn btn-dark mt-3 me-2" onClick={resetsheet}>Reset</button>
  </div>
  </div>
</div>


<div className="container mt-4">
      {(viewmode === "normal" ? sheet : filteredsheet).length === 0 ? (
        <p className="text-center">No marks data available.</p>
      ) : (
        <div className="table-responsive">
          <Table bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>USN</th>
                <th>Subject</th>
                <th>Total IA Marks</th>
                <th>Total Classes</th>
                <th>Classes Attended</th>
                <th>Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {(viewmode === "normal" ? sheet : filteredsheet).map((student) =>
                student.subject_status.map((subject, index) => {
                  let rowColor = "";
                  if (viewmode === "overview") {
                    if (subject.marks < 40) rowColor = "table-danger";
                    else if (subject.marks < 70) rowColor = "table-warning";
                    else rowColor = "table-success";
                  }

                  return (
                    <tr key={`${student.usn}-${index}`} className={rowColor}>
                      <td>{student.usn}</td>
                      <td>{subject.subname}</td>
                      <td>{subject.marks}</td>
                      <td>{subject.totalClasses}</td>
                      <td>{subject.classesAttended}</td>
                      <td>{subject.attendance_percentage}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
</>
    );
  }