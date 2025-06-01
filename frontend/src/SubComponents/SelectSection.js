import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../contexts/FacultyContext";
import Axios from 'axios'
import Header from "../Components/Header";
import { Button } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SectionOption =({logout})=>{
    const navigate = useNavigate();
    const {facultyId,setSecname} = useContext(FacultyContext)
    // const {secname} = useContext(FacultyContext)
    const[sections,setsections]=useState([]);
    // check if the facultyid for the session is a classteacher of any class
    // if yes fetch all those sections whom he/she is a class teacher..




useEffect(()=>{
    if(facultyId){
        
            const fetch_section_fn=async(e)=>{
                try{
            let fetched_sections= await Axios.get(`http://localhost:8000/fetchsections?facultyId=${facultyId}`);
            if(fetched_sections.data && fetched_sections.data.length >0){
                console.log(fetched_sections.data)
                setsections(fetched_sections.data)
            }else{
                setsections([])
            }
        }
        catch{
            console.log("Error fetching data");
            setsections([]);
        }
    }
    fetch_section_fn();
}},[facultyId]);

    if(sections.length===0){
        return <div>No sections allotted</div>
    }
    // these sections will then be rendered as buttons, 
    // on clicking which will be redirected to ia attendace of that section...

    const handleSectionClick=(section)=>{
        setSecname(section.secname)  //cz from backend we get the entire document ...from there we use only secname
        navigate("/markattendance")
    }
    return(
    <>
          <Header logout={logout} />
        <Container>
        <div className="d-flex mt-5 justify-content-around ">
          {sections.map((section) => (
        <Button
            variant="success"
            size="lg"
          key={section._id}
          onClick={() => handleSectionClick(section)}
        >
          Section {section.secname}
        </Button>
      ))}
          
        </div>
      </Container>
    
    </>
);
}

