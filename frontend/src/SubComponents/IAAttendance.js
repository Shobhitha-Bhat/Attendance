import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table,Spinner } from 'react-bootstrap'
import Header from '../Components/Header'
import { useContext } from 'react'
import { FacultyContext } from '../contexts/FacultyContext'


export const IAAttendance = ({logout}) => {
  const [iadata,setiadata]=useState([])
  const {secname} = useContext(FacultyContext)

useEffect(()=>{
  const getiaattendance=async()=>{
    try{
      const response = await Axios.get(`http://localhost:8000/getiaAttendance?section=${secname}`)
      setiadata(response.data)
    }catch{
      console.log("Error");
      setiadata([])
    }
}
  getiaattendance()
  },[])

  return (
    <>
    <Header logout={logout} />
    <div className='m-5'>


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
    
    </>
  )
}
