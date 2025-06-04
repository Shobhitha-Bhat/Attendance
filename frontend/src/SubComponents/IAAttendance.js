import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table,Spinner } from 'react-bootstrap'
import Header from '../Components/Header'
import { useContext } from 'react'
import { FacultyContext } from '../contexts/FacultyContext'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const IAAttendance = ({logout}) => {
  const [iadata,setiadata]=useState([])
  const {secname} = useContext(FacultyContext)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
  usn: "",
  name: "",
  stmail: "",
  secname:secname ||""
  });

useEffect(()=>{
  const getstudents=async()=>{
    try{
      const response = await Axios.get(`http://localhost:8000/getstudents?section=${secname}`)
      setiadata(response.data)
    }catch{
      console.log("Error");
      setiadata([])
    }
}
  getstudents()
  },[])



const addstudent=()=>{
setShowModal(true);
}



const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const response = await Axios.post("http://localhost:8000/addstudent", formData);
    alert("Submitted successfully");
    console.log(response.data)
    const updatedlist = await Axios.get(`http://localhost:8000/getstudents?section=${secname}`)
      setiadata(updatedlist.data)
    setShowModal(false);
    setFormData({ usn: "", name: "", stmail: "",  });
  } catch (error) {
    console.error("Error submitting data", error);
  }
}
  return (
    <>
    <Header logout={logout} />
    <h4 className="text-center mt-3">Section : {secname}</h4>
    <div className='m-3'>
    <Table  striped bordered rounded hover responsive>
    <thead>
      <tr>
        <th>USN</th>
        <th>Name</th>
        <th>Email</th>
        <th>Section</th>
      </tr>
    </thead>
    <tbody>
      {iadata.length > 0 ? (
        iadata.map((student) => (
          <tr key={student._id}>
            <td>{student.usn}</td>
            <td>{student.name}</td>
            <td>{student.stmail}</td>
            <td>{student.secname}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">
            <Spinner animation="border" variant="primary" />
            Loading...
          </td>
        </tr>
      )}
    </tbody>
  </Table>
    </div>
    <div className="text-center">
      <Button
            variant="success"
            size="lg"
            className="mr-5 "
            onClick={addstudent}
          >
           Add Student
          </Button>
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Enter Student Details</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleFormSubmit}>
    <Modal.Body>
      <Form.Group controlId="formUsn">
        <Form.Label>USN</Form.Label>
        <Form.Control
          type="text"
          name="usn"
          value={formData.usn}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formName" className="mt-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formMail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="stmail"
          value={formData.stmail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {/* <Form.Group controlId="formSection" className="mt-3">
        <Form.Label>Section</Form.Label>
        <Form.Control
          type="text"
          name="secname"
          value={formData.secname}
          onChange={handleChange}
          required
        />
      </Form.Group> */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Modal.Footer>
  </Form>
</Modal>
    </>
  )
}

