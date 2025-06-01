import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../contexts/FacultyContext";
import Axios from 'axios'
import Header from "./Components/Header";


export const SectionOption =({logout})=>{
    const {facultyId} = useContext(FacultyContext)
    const[sections,setsections]=useState([]);
    // check if the facultyid for the session is a classteacher of any class
    // if yes fetch all those sections whom he/she is a class teacher..




useEffect(()=>{
    if(facultyId){
        
            const fetch_section_fn=async(e)=>{
                try{
            let fetched_sections= await Axios.get(`http://localhost:8000/fetchsections?facultyId=${facultyId}`);
            if(fetched_sections.data && fetched_sections.data.length >0){
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
    return(
    <>
          <Header logout={logout} />
    
    
    </>
);
}

