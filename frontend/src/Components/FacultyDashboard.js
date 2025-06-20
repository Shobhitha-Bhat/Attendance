import React from "react";
import Header from "./Header";
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

export const FacultyDashboard = ({logout}) => {
  const navigate = useNavigate();

  // const handlelogout = () => {
  //   logout();
  //   localStorage.clear();
  //   navigate('/')
  // };

  // const user = JSON.parse(localStorage.getItem("LoginData"));
  // const username = user?.facultyid? user.facultyid : "faculty";

  const {facultyId} = useContext(FacultyContext)
  const username = facultyId || "faculty";
  return (
    <>
      <Header logout={logout} />
   
      <h3 className="text-center mt-5 mb-5">
        DASHBOARD : {username}
      </h3>
      
      <Container>
        <div className="d-flex justify-content-around ">
          <Button
            variant="dark"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/academicspage")}
          >
            Academic Stats
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/sectionbuttons")}
          >
            Mark Attendance
          </Button>
          <Button
            variant="info"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/selectsection")}
          >
            IA / Attendance
          </Button>
          {/* <Button
            variant="warning"
            size="lg"
            onClick={() => navigate("/extracurricularpage")}
          >
            ExtraCurricular Activities
          </Button> */}
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/notifyparentcard")}
          >
            Notify Parent
          </Button>
        </div>
      </Container>
      
    </>
  );
};
