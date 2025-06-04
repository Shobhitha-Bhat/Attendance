import React from "react";
import Header from "../Components/Header";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
// import AcademicCard from '../SubComponents/AcademicCard'
// import ExtraCurricularCard from '../SubComponents/ExtraCurricularCard';
// import StudentProfileCard from '../SubComponents/StudentProfileCard';
import NotifyParentCard from "../SubComponents/NotifyParentCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FacultyContext } from "../contexts/FacultyContext";

import { useState } from "react";
import  Axios  from "axios";
import { useEffect } from "react";


export const IADasboard = ({logout}) => {
  const navigate = useNavigate();

  const {facultyId} = useContext(FacultyContext)
  const {secname} = useContext(FacultyContext)
  const username = facultyId || "faculty";
 



  return (
    <>
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
        <div className="d-flex justify-content-around ">
          <Button
            variant="success"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/iaattendance")}
          >
            Student List
          </Button>
          <Button
            variant="success"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/subjectdashboard")}
          >
            Subjectwise Marks
          </Button>
        </div>
      </Container>



      

    </>
  );
};
