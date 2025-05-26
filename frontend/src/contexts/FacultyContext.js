import React,{createContext,useState} from "react";


export const FacultyContext = createContext();
export const FacultyProvider = ({children})=>{
    const [facultyid,setfacultyid]=useState("");
    return (
        <FacultyContext.Provider value={{facultyId, setFacultyId}}>
            {children}
        </FacultyContext.Provider>
    );
}