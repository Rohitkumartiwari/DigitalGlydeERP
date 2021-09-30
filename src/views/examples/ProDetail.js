import React, { useEffect,useState } from 'react';
import firebase from "firebase";
import Moment from 'moment';

import {db} from "../../firebase.js";
import "../../index.css";
import { Table } from 'reactstrap';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import {
  Input,
  Modal
} from "reactstrap";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    
  }
};
// Modal.setAppElement('#root');

const ProDetail = () => {
  var subtitle;
 
  const[pname,setpname]=useState("");
  const [documents,setDocuments]=useState([]);
  const[filterdoc,setfilterdoc]=useState("");
  const [usedata,setData]=useState([]);
  const[document,setDocument]=useState({});
  const [modalIsOpen,setIsOpen] = React.useState(false);
 const[change,setChange]=useState(true);
 const[data1,setData1]=useState([]);
 const columns = [
  { title: 'Project', field: 'pname', cellStyle: {
    minWidth: 150,
    maxWidth: 150
  } },
  { title: 'Starting Date', field: 'date1', cellStyle: {
    minWidth: 150,
    maxWidth: 150
  } },
  { title: 'Estimate Date', field: 'date2', cellStyle: {
    minWidth: 150,
    maxWidth: 150
  } },
  { title: 'Employee Name', field: 'emp' , cellStyle: {
    minWidth: 150,
    maxWidth: 150
  }},
  { title: 'Current Task', field: 'task', cellStyle: {
    minWidth: 150,
    maxWidth: 150
  } },
  { title: 'Status', field: 'status' , cellStyle: {
    minWidth: 150,
    maxWidth: 150
  }},
  { title: 'Task Desc', field: 'taskdisc' , cellStyle: {
    minWidth: 150,
    maxWidth: 150
  }},
  
]

 useEffect(()=>
 {
  db.collection("empData")
  .get()
  .then((querySnapshot) => {
    let arr = [];
    querySnapshot.docs.map((doc) =>
    
      arr.push({
           id: doc.id,
         name: doc.data().name,       
       })        
    )  
    setDocuments(arr);
    console.log("arr",arr);
    
  });
  //  db.collection("Profile")
  //   .get()
  //   .then((querySnapshot) => {
  //     let arr = [];
  //     querySnapshot.docs.map((doc) =>       
  //       arr.push({
  //            id: doc.id,
  //          pname: doc.data().firstname,
  //         })           
  //     )     
  //     setEmpdoc(arr);
  //     console.log("hii",arr);
  //     setChange(!change);      
  //   });
  db.collection("AssignProject")
  .get()
  .then((querySnapshot) => {
    let arr = [];
    querySnapshot.docs.map((doc) =>      
      arr.push({
           id: doc.id,
         pname: doc.data().Projectname,
         date1:doc.data(). estimatedate,
         date2:doc.data(). startdate,
         emp:doc.data(). Employee,
         status:doc.data(). status,
         task:doc.data().task,
         taskdisc:doc.data(). taskdisc,
       })
    )    
    setData(arr);
    setData1(arr);
    console.log(data1);
    
   setfilterdoc(arr);
    console.log("setDataarr",arr);
  });  

 },[]);
  console.log("pname",pname);
  console.log("usedata",usedata);
  console.log("documents",documents);

function openModal(document) {
  // console.log("doc",document);
  let doc=document;
  console.log("doc",doc);
  setDocument(doc);
  setIsOpen(true);
}
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = 'white';
}
function closeModal(){
  setIsOpen(false);
}
async function delete1()
{ 
    const del = await db.collection('AssignProject').doc(document.id).delete(); 
    console.log("delete",del);
}
function setField(e,name1)
{
  console.log("doc1",document);
  let doc=document;
  doc[name1]=e;
  console.log("doc2",doc);
  setDocument(doc);
  console.log(document);
  setChange(!change);
};
async function update()
{
  console.log("doc",document);
  const res=   db.collection('AssignProject')
  .doc(document.id);
  console.log(document.date2);
  const res1=await res.update({
   startdate:document.date2,
   estimatedate:document.date1,
   status:document.status,
   Projectname:document.pname,
   Employee:document.emp,
  });
  console.log("date2",document.date2);  
}
console.log(data1);
    return(
      <div className="form-group col-md-5">
      {/* <label for="inputState">Employee</label>
      <Input type="select" name="select" id="exampleSelect3" onChange={(e)=>{       
         if(e.currentTarget.value=="")
         {
           setData(filterdoc);
         }
         else{
          let demo1=JSON.parse(e.currentTarget.value);
          var info1=filterdoc.filter((a)=>a.emp==demo1.name);            
          console.log("info",info1);
          setData(info1);
          console.log("onchange2",demo1);
         }       
            }}> 
              <option value="">All</option>                     
          { documents.map(dropdown => {           
        return <option key={dropdown} dropdown={dropdown}  value={JSON.stringify(dropdown)}>{dropdown.name}
           </option>;         
        })
    }         
       </Input>   
       <br></br>
       <br></br>
       <div>
  <Table >
    <thead >
        <tr >
        <td >Project Name</td> 
        <td>Starting Date </td>
          <td>Estimate Date</td>          
          <td>Employee Name</td>
          <td>Current Task</td>
          <td>Status</td>
          <td>Task Disc</td>
        </tr>
        </thead>
    <tbody>
      {usedata.map((document) => (     
        <tr key={document.id} onClick={()=>openModal(document)}>
         
           <td> {document.pname} </td>
           <td> {Moment(document.date2).format("MMM D, YYYY")} </td>
          <td> {Moment(document.date1).format("MMM D, YYYY")} </td>         
          <td> {document.emp} </td>
          <td> {document.task} </td>
          <td> {document.status} </td>
          <td> {document.taskdisc} </td>        
        </tr>
     )) }    
   </tbody>
      </Table>
   </div>
 <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          contentLabel="Example Modal"
        >
            <form >
              <div className="form-group col-md-6">
            <label for="inputEmail4">Project</label>
            <input type="text" className="form-control" id="inputPro1" placeholder="project"
             value={document.pname}
             onChange={e=>{
             setField(e.currentTarget.value,"pname")}}/>
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Employee</label>
            <input type="text" className="form-control" id="inputPro2" placeholder="emp"
             value={document.emp}
             onChange={e=>{
              setField(e.currentTarget.value,"emp")}}
             />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Task</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="Task"
             value={document.task}
             onChange={e=>{
            console.log("data",e.currentTarget.value);
           setField(e.currentTarget.value,"task")}}/>
          </div>
          <div className="form-group col-md-5">
          <label for="inputAddress2">Task Created Date</label>
          <input type="date" className="form-control" id="inputAddress4" placeholder=""
           value={document.date2}
           onChange={e=>
           setField(e.currentTarget.value,"date2")}/>
        </div>
        <div className="form-row pl-4">
        <div className="form-group col-md-5">
          <label for="inputAddress2">Task Completion Date</label>
          <input type="date" className="form-control" id="inputAddress5" placeholder="DD/MM/YYYY "
           value={document.date1}
           onChange={e=>
           setField(e.currentTarget.value,"date1")}/>
        </div>
        </div>
        <div className="form-group col-md-5">
      <label for="inputState">Status</label>    
      <Input type="select" name="select" id="exampleSelect1" onChange={e=>
             setField(e.currentTarget.value,"status")}> 
              <option value>{document.status}</option>                 
         <option value="start"  >start</option>
         <option value="progress">progress</option>
         <option value="end">end</option>            
       </Input>
    </div>  
            </form>
            <div className="div2">
           <button  onClick={closeModal} className="btn btn-primary">close</button>
           </div>
           <br></br>
           <div className="div2">
           <button  onClick={update}
      
           
          
           className="btn btn-primary">Update</button>
           </div>
           <br></br>
           <div className="div2">
           <button  onClick={delete1} className="btn btn-primary">Delete</button>
           </div>
        </Modal> */}
       <br></br>
        <MaterialTable title="Material Table" style={{ width: 1170 ,height:600}}
        
            data={data1}
            columns={columns}

            editable={{
                onRowAdd: (newRow) => new Promise((resolve, reject) => {
                    const updatedRow = [...data1, newRow];
                    console.log(updatedRow);
                    setData1(updatedRow)
                    resolve()
                    console.log(newRow);
                    
                }),
                onRowDelete: selectedRow => new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    console.log(index);
                    const updatedRow = [...data1];
                    updatedRow.splice(index, 1);
                    setData1([...updatedRow])
                    resolve()
                    console.log(data1);
                    
                }),
                onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>
                {
                    const index=oldRow.tableData.id
                    console.log("updated row",updatedRow)
                    console.log("old row",oldRow)
                    const updatedRows = [...data1];
                    updatedRows[index]=updatedRow;
                    setData1([...updatedRows])
                    resolve()
                })
            }}
            options={{
              rowStyle: {
                fontSize: 18,
              }, headerStyle: {
                fontSize: 18,
              }, searchFieldStyle: {
                fontSize: 18,
              },
                actionsColumnIndex: -1
            }}

        />  
        </div>
     
  )
}     

export default ProDetail;
