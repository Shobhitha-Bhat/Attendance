import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { FacultyContext } from "../contexts/FacultyContext";
import { useContext } from "react";
import Header from "../Components/Header";
import  Axios  from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SectionButtons = ({logout})=>{
        const navigate = useNavigate();
    const {setSecname} = useContext(FacultyContext)
    const [sections,setSections]=useState([]);
    //ask database for all the possible sections, render them a buttons and then select one to mark attendance

    //ask database for sections
    useEffect(()=>{
const fetch_all_sections=async(e)=>{
                try{
            let fetched_sections= await Axios.get("http://localhost:8000/fetchallsections");
            if(fetched_sections.data && fetched_sections.data.length >0){
                console.log(fetched_sections.data)
                setSections(fetched_sections.data)
            }else{
                setSections([])
            }
        }
        catch{
            console.log("Error fetching data");
            setSections([]);
        }
    }
    fetch_all_sections();
},[])

const handleSectionClick=(section)=>{
    setSecname(section.secname);
    navigate("/markattendance")
}
    return(<>
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