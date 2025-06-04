import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { FacultyContext } from "../contexts/FacultyContext";
import { useContext } from "react";
import Header from "../Components/Header";
import  Axios  from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Subjects = ({logout}) =>{
const navigate = useNavigate();
  const {facultyId} = useContext(FacultyContext)
  const {secname} = useContext(FacultyContext)
  const {setSubjname} = useContext(FacultyContext)
  const username = facultyId || "faculty";
    const [subjects,setSubjects]=useState([]);
    //ask database for all the possible sections, render them a buttons and then select one to mark attendance

    //ask database for sections
    useEffect(()=>{
const fetch_all_subjects=async(e)=>{
                try{
            let fetched_subjects= await Axios.get("http://localhost:8000/getallsubjects");
            if(fetched_subjects.data && fetched_subjects.data.length >0){
                console.log(fetched_subjects.data)
                setSubjects(fetched_subjects.data)
            }else{
                setSubjects([])
            }
        }
        catch{
            console.log("Error fetching data");
            setSubjects([]);
        }
    }
    fetch_all_subjects();
},[])

const handleSectionClick=(subject)=>{
    setSubjname(subject.subname);
    navigate("/showsubjectmarks")
}
    return(<>
    <Header logout={logout} />
    <div>
      <h3 className="text-center mt-5 mb-3">
        Class Supervisor : {username}
      </h3>
      <h3 className="text-center mb-5">
        Section : {secname} 
      </h3>
      
    </div>
        <Container>
        <div className="d-flex mt-5 justify-content-around ">
          {subjects.map((subject) => (
        <Button
            variant="success"
            size="lg"
          key={subject._id}
          onClick={() => handleSectionClick(subject)}
        >
          {subject.subname}
        </Button>
      ))}
          
        </div>
      </Container>
    </>
    );
}