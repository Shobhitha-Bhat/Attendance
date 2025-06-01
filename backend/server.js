import express from "express";
import mongoose from "mongoose";
import cors from "cors"
// const twilio = require('twilio');
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
// can see only in facultysubjectbranch

const port = 8000
const app = express() //fetch express functionality
app.use(cors())
app.use(express.json())
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

//database connectivity
mongoose.connect('mongodb+srv://shobhitha_bhat:shobiacon2208@cluster0.uugyuwo.mongodb.net/MiniProject')
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})

//mongoose Schema for faculty
let facultySchema = new mongoose.Schema({
    //fields
    //mongoose data-type
    fname : { type : String },
    femail : { type : String },
    fpassword : { type : String },
    facultyid : { type : String }
}, {timestamps : true}
)

let parentSchema = new mongoose.Schema({
    pmail :{type:String},
    ppassword:{type:String},
    usn:{type:String},
    pcontact:{type:Number}
},{timestamps:false})

let parentmessageSchema = new mongoose.Schema({
    facultyMail:{type:String},
    parentMail:{type:String},
    studentUsn:{type:String},
    phone:{type:Number},
    subject:{type:String},
    msg:{type:String}
},{timestamps:true})

let facultymessageSchema = new mongoose.Schema({
    facultyMail:{type:String},
    parentMail:{type:String},
    studentUsn:{type:String},
    // phone:{type:Number},
    subject:{type:String},
    msg:{type:String}
},{timestamps:true})

let studentSchema = new mongoose.Schema({
    usn:{type:String},
    name:{type:String},
    stmail:{type:String},
    section:{type:String}
})

// let enrolledsubSchema=new mongoose.Schema({
//     usn:{type:String},
//     enrolledsubjects:{type:[String]},
//     marks:{type:[Number]},
//     attendance:{type:Number}
// })

let subjectSchema = new mongoose.Schema({
    subname:{type:String},
    fId:{type:String}
})

let sectionSchema = new mongoose.Schema({
    secname:{type:String},
    classFacultyId:{type:String}
})

// let attendSchema = new mongoose.Schema({
//     stUSN:{type:String},
//     subName:{type:String},
//     marks:{type:Number},
//     totalClasses:{type:Number},
//     classesAttended:{type:Number},
//     percentage:{type:Number}
// })

let subjectstatus = new mongoose.Schema({
    subname:{type:String},
    marks:{type:Number},
    totalClasses:{type:Number},
    classesAttended:{type:Number},
    attendance_percentage:{type:Number}
})
let student_marks_attendance = new mongoose.Schema({
    usn:{type:String},
    subject_status:[subjectstatus]
})

//create Models for Schema
let userModel1 = new mongoose.model('Faculty', facultySchema )
let userModel2 = new mongoose.model('Parent', parentSchema )
let ParentMsgModel = new mongoose.model('ParentMessage',parentmessageSchema)
let FacultyMsgModel = new mongoose.model('FacultyMessage',facultymessageSchema)
let student = new mongoose.model('Student',studentSchema)
// let enrolledSubjectsSchema = new mongoose.model('EnrolledSubject',enrolledsubSchema)
let subjectmodel = new mongoose.model('Subjects',subjectSchema)
let sectionmodel = new mongoose.model('Sections',sectionSchema)
// let attendModel = new mongoose.model('Attends',attendSchema)
let studentmarks = new mongoose.model('Student_marks',student_marks_attendance)

//async-await : used while dealing with databases
let createFaculty = async function(req, res){
    let {fname,femail,fpassword,facultyid} = req.body; //fetching request from postman body
    let result = await userModel1.create(
        {fname,femail,fpassword,facultyid}
    );
    res.status(200).json({msg : "New Faculty Registered", data : result})
}

let createParent = async function(req, res){
    let {pmail,ppassword,usn,pcontact} = req.body; //fetching request from postman body
    console.log("Received data: ",{pmail,ppassword,usn,pcontact})
    let result = await userModel2.create({pmail,ppassword,usn,pcontact});
    res.status(200).json({msg : "New Parent Registered", data : result})
}


let createParentMessage=async function(req,res){
    let {facultyMail,parentMail,studentUsn,phone,subject,msg}=req.body;
    console.log("Received message ",{parentMail,studentUsn,phone,subject,msg})
    let result = await ParentMsgModel.create({facultyMail,parentMail,studentUsn,phone,subject,msg})
    console.log("Result",result)
    res.status(200).json({msg:"A new Message added to DB", data:result})
    try {
        const message = await client.messages.create({
            body: `${subject}\n\n${msg}`,
            // from: '+15079441641', // Twilio Number 
            from:'+000',
            // to: phone,  // Recipient Number
            to:'+910000' 
        });
        console.log('Message SID:', message.sid);
    } catch (err) {
        console.error('Error sending message:', err.message || err);
    }
}


let createFacultyMessage=async function(req,res){
    let {parentMail,facultyMail,studentUsn,subject,msg}=req.body;
    console.log("Received message ",{parentMail,facultyMail,studentUsn,subject,msg})
    let result = await FacultyMsgModel.create({parentMail,facultyMail,studentUsn,subject,msg})
    console.log("Result",result)
    res.status(200).json({msg:"A new Message added to DB", data:result})
    // try {
    //     const message = await client.messages.create({
    //         body: `${subject}\n\n${msg}`,
    //         from: '+15079441641', // Twilio Number
    //         to: phone,  // Recipient Number
    //     });
    //     console.log('Message SID:', message.sid);
    // } catch (err) {
    //     console.error('Error sending message:', err.message || err);
    // }
}



// let getFaculty = async function(req, res){
//     let data = await userModel1.find({facultyid:req.body.facultyid})
//     // res.status(200).json({msg : "All faculty Details", data : data})
//     console.log(data)
//     res.status(200).json(data)
// }

let loginFacultyData = async function(req, res){
    let {facultyid,fpassword}=req.body
    let data = await userModel1.find({facultyid, fpassword})
    // res.status(200).json({msg : "All faculty Details", data : data})
    console.log(data)
    res.status(200).json(data)
}


let loginParentData = async function(req, res){
    let {pmail,usn}=req.body
    let data = await userModel2.find({pmail,usn})
   
    console.log(data)
    res.status(200).json(data)
}

let getparentmessages=async function(req,res){
    let data=await ParentMsgModel.find().sort({ updatedAt: -1 })
    console.log(data)
    res.status(200).json({msg : "All Inbox messages", data : data})
}

let getfacultymessages=async function(req,res){
    let data=await FacultyMsgModel.find().sort({ updatedAt: -1 })
    console.log(data)
    res.status(200).json({msg : "All Inbox messages", data : data})
}

let getiaAttendance=async function(req,res){
    let section_name = req.query.section;
    let data=await student.find({secname:section_name})
    console.log(data)
    res.status(200).json(data)
}

let getAttendanceSheet = async function(req,res){
    let section_name = req.query.section
    let retrieved_students=await student.find({secname: section_name},'usn name')
    console.log(retrieved_students)
    res.status(200).json(retrieved_students)
}

let classAttendance=async function(req,res){
    let {usn} = req.body;
    let phoneNumberofParent= await userModel2.find({usn},'pcontact')
    console.log(phoneNumberofParent)
    res.status(200).json(phoneNumberofParent)

}

let sendClassAttendance = async function(req,res){
let {Usn,subject,body,phonenum}=req.body
console.log("Received data:", req.body);
let studentUsn=req.body.usn
let phone = phonenum[0].pcontact;

let response = await ParentMsgModel.create({studentUsn,subject,msg:body,phone})
console.log("Result",response)
res.status(200).json({msg:"A new Message added to DB"})

// if (typeof phone !== 'string' || phone.trim() === '') {
//     return res.status(400).json({ error: "Invalid phone number" });
// }
phone = phone.toString();
if (phone && !phone.startsWith('+')) {
    phone = '+' + phone;
  }

try {
    const message = await client.messages.create({
        body: `${subject}\n\n${body}`,
        // from: '+15079441641', // Twilio Number Shobhitha
        from:'+12293185829',
        // to: phone,  // Recipient Number
        to:'+918197680621'  //Shamitha
    });
    console.log('Message SID:', message.sid);
} catch (err) {
    console.error('Error sending message:', err.message || err);
}
}


const fetchSections = async function(req,res){
    const facultyId = req.query.facultyId;
    try {
        const retrieved_sections = await sectionmodel.find({ classFacultyId: facultyId });
        console.log(retrieved_sections);
        res.status(200).json(retrieved_sections);
    } catch (err) {
        console.error("Error fetching sections:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

const fetchAllSections=async(req,res)=>{
    let fetched_sections = await sectionmodel.find().sort({secname:1});
    console.log(fetched_sections)
    res.status(200).json(fetched_sections);
}


// ===================== //
app.post('/createfaculty', createFaculty);
app.post('/createparent', createParent);
// app.get('/getfacultydata', getFaculty);
app.post('/loginFacultyData',loginFacultyData)
app.post('/loginParentData',loginParentData)

app.post('/addnewparentmessage',createParentMessage)
app.post('/addnewfacultymessage',createFacultyMessage)

app.get('/getparentmessages',getparentmessages)
app.get('/getfacultymessages',getfacultymessages)

app.get('/getiaattendance',getiaAttendance)

app.get('/getattendancesheet',getAttendanceSheet)

app.post('/classAttendance',classAttendance)

app.post('/sendclassattendance',sendClassAttendance)
app.get('/fetchsections',fetchSections);
app.get('/fetchallsections',fetchAllSections);


//listen functionality
app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
})