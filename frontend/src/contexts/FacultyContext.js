import React,{createContext,useState} from "react";


export const FacultyContext = createContext();
export const FacultyProvider = ({children})=>{
    const [facultyId,setFacultyId]=useState("");
    const [secname, setSecname] = useState([]);
    const [subjname, setSubjname] = useState("");
    return (
        <FacultyContext.Provider value={{facultyId, setFacultyId,secname,setSecname,subjname,setSubjname}}>
            {children}
        </FacultyContext.Provider>
    );
}