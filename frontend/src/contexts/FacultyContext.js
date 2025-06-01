import React,{createContext,useState} from "react";


export const FacultyContext = createContext();
export const FacultyProvider = ({children})=>{
    const [facultyId,setFacultyId]=useState("");
    const [secname, setSecname] = useState([]);
    return (
        <FacultyContext.Provider value={{facultyId, setFacultyId,secname,setSecname}}>
            {children}
        </FacultyContext.Provider>
    );
}