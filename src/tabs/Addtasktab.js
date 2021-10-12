import React from "react";
import { useState } from "react";
import _ from "lodash";
import {db} from "../firebase";
import {storage} from "../firebase";
import {
    Input,
    Row,
    Container,
    Table
  } from "reactstrap";

 const Addtasktab=(props)=>
 {
   const[taskdata,settaskdata]=useState([]);
    const [file, setFile] = useState(null);
    const[pdisc,setpdisc]=useState([]);
    const[taskpri,settaskpri]=useState([]);
    const[status,setstatus]=useState([]);
    const[group,setgroup]=useState([]);
    const[info,setinfo]=useState([]);
    const[emp,setemp]=useState([]);
    const[pname,setpname]=useState([]);
    console.log(props);
    React.useEffect(()=>
    {
        db.collection("AssignProject")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,
            ename: doc.data().Employee,
            pname: doc.data().Projectname,
            status:doc.data().status
          })
         
          )
          
        const grouped = _.groupBy(arr, "pname");
        console.log(grouped);
        var res = Object.keys(grouped).map((i) => {
            return (
                {
              name: i,
              count: grouped[i].length,
              detail: grouped[i],
            });
          });
          console.log("res",res);
          setgroup(res);
          
          var info1 = group.filter((a) => a.name == props.location.state.data.pname);
          console.log(info1);
          setinfo(info1);
         //mapping
          {
            info1.map((i)=>
            { let arr=[];
             i.detail.map((j)=>
             {
               console.log(j.ename);
              
               arr.push({
                   empname:j.ename
               });
               console.log(arr);
              
             }
             )
             setemp(arr);
             })
        }
       
    });
    },[]);
    console.log(info);
    console.log("group",group);

    console.log("emp",emp);
const handleSubmit = e => {
  e.preventDefault();
  //if await is removed, console log will be called before the uploadFile() is executed completely.
  //since the await is added, this will pause here then console log will be called
  if(file == null)
  return;
storage.ref(`/files/${file.name}`).put(file)
.on("state_changed" , alert("success") , alert);
};
const handleOnChange = e => {
  console.log(e.target.files[0]);
  setFile(e.target.files[0]);
};
console.log(taskpri);
console.log(status);
console.log(pname)
console.log(taskdata);
const onSubmit=(e)=>
{
e.preventDefault();
db.collection("tasktab")
      .add({       
       taskpriority:taskpri,   
       taskstatus:status,
       projectname:props.location.state.data.pname,
    
     
    })
    .then((docRef) => {
      console.log(docRef)
        alert("Data Successfully Submitted");
       
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    }); 
    
     
}
db.collection("tasktab")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) => 
            
        arr.push({
            
           pname: doc.data().projectname,
           taskpri: doc.data().taskpriority,
           tasksta: doc.data().taskstatus
           
          
         })  
       
      )    
      settaskdata(arr);
      console.log(taskdata);
      console.log("hii",arr);
    }); 
    // RETURN
     return(
       <>
      <div className="taskdiv">
      <div className="form-group col-md-7">
        <br></br>
        <label for="inputAddress">Project Discription</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="Discribe Project"
                            value={pdisc}
                            onChange={e=>
                            setpdisc(e.currentTarget.value)}
        />
       
        </div>
        
        <div className="form-group col-md-5">
      <label for="inputState">Task Priority</label>    
      <Input type="select" name="select" id="exampleSelect" onChange={e=>
             settaskpri(e.currentTarget.value)}> 
              <option value="">Select Priority</option>                 
         <option value="high">High</option>
         <option value="low">Low</option>
         <option value="mediam">Medium</option>            
       </Input>
       
    <br></br>
       
      <label for="inputState">Status</label>    
      <Input type="select" name="select" id="exampleSelect" onChange={e=>
             setstatus(e.currentTarget.value)}> 
              <option value="">Select Status</option>                 
         <option value="new">New</option>
         <option value="in progress">In Progress</option>
         <option value="completed">Completed</option>    
         <option value="cancelled">Cancelled</option>          
       </Input>
   
    <br></br>
   
    <label for="inputState"> Employee Name</label>
    <Input type="select" name="select" id="exampleSelect1" onChange={e=>{
        let demo=JSON.parse(e.currentTarget.value);
      console.log("onchange1",demo);
             setpname(demo.pname)
            }}> 
              <option value="">Select Employee</option> 
              { emp.map(dropdown => {            
           return <option key={dropdown} dropdown={dropdown} value={JSON.stringify(dropdown)} >{dropdown.empname}
              </option>;
              // 
           })
       }             
       </Input>
       <form onSubmit={handleSubmit}>
   <h2>Upload The File</h2>
    <input type="file" onChange={handleOnChange} />
    <button type="submit" >Upload File</button>
    <div className="divtask1">
        <button  type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
        </div>
  </form>
  
        <Table className="tasktable" >
    <thead >
        <tr>
           <td>Project Name</td>
         <td>Task Priority</td>     
         <td>Task Status</td>    
        </tr>
        </thead>
    <tbody>
      {taskdata.map((document) => (     
        <tr key={document.taskpri}>         
          <td> {document.pname} </td>
          <td> {document.taskpri} </td>
           <td>{document.tasksta}</td>
           
        </tr>
     )) }
     
   </tbody>
      </Table>
       </div>
       </div>
       </>
     );
 }
 export default Addtasktab;