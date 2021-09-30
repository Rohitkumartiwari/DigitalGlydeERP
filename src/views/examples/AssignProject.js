import React from "react";
import { useState } from "react";
import firebase from "../../firebase";
import Autocomplete,{ createFilterOptions } from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import {
    Input,
    Row,
    Col,
    Container,
    Modal
  } from "reactstrap";

const AssignProject=()=>
{
  var subtitle;
  const filter = createFilterOptions();
  const[empdoc,setEmpdoc]=React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [project, setProject] = React.useState([]);
  const[taskdoc,settaskdoc]=React.useState([]);
  const[change,setChange]=React.useState(true);
  const [val,setval]=useState({});
  const [taskval,settaskval]=useState({});
  const[vd1,setvd1]=useState([]);
  const[usetask,setusetask]=useState("");
  React.useEffect(() => {
    Data1();
  }, []);
  console.log("doc",documents);
  console.log("taskval",taskval);
  console.log("val",val);
  function Data1()
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
      console.log("hii",arr);
      setChange(!change);      
    });
    db.collection("Profile")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>       
        arr.push({
             id: doc.id,
           pname: doc.data().firstname,
          })           
      )     
      setEmpdoc(arr);
      console.log("hii",arr);
      setChange(!change);      
    });
    db.collection("task")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      // arr[0]="Other",
      querySnapshot.docs.map((doc) =>     
        arr.push({
             id: doc.id,
            //  tname:"Other",
           tname: doc.data().taskname,
          })   
      )
     arr.push({"tname":"Other"});
 
     setval(arr.find(a=>a.tname==usetask));
    //  setval(arr.find(b=>b.tname==taskval));
    
      settaskdoc(arr);
      console.log("taskdoc",arr);
      {taskdoc.map((ta)=>
        {
          console.log(ta.tname);
        })
      }
      setChange(!change);        
    });
    db.collection("proview")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>       
        arr.push({
             id: doc.id,
           pname: doc.data().pname,
          })           
      )      
      setProject(arr);
      console.log("hii",arr);
      setChange(!change);       
    });     
  }
  
  const db = firebase.firestore();
  const[pname,setpname]=useState("");
  const[pid,setpid]=useState("");
  const [emp, setemp] = useState("");
  const [eid, seteid] = useState("");
  const [date1, setdate1] = useState("");
  const [date2, setdate2] = useState("");
  const[task,settask]=useState("");
  const[taskd,settaskd]=useState("");
  const[status,setstatus]=useState("");
 const[tid,settid]=useState("");
 const [modalIsOpen,setIsOpen] = React.useState(false);
  const onSubmit=(e)=>
  {
   console.log(tid);
    e.preventDefault();
    let arr={
      Projectname:pname,
      projectid:pid,
      Employee:emp,
      Employeeid:eid,
      estimatedate:date1,
      startdate:date2,
     task:vd1,
     taskdisc:taskd,
    status:status,
    }
    console.log("arr1",arr);
    console.log("hello");
    db.collection("AssignProject")
      .doc()
      .set(arr)
      .then(function () {
        console.log("Value successfully written!");
       window.location.reload();
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
      //add task to firebase   
      db.collection("task")
      .add({       
       taskname:tid,     
    })
    .then((docRef) => {
        alert("Data Successfully Submitted");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    }); 
     console.log(task) ;
   alert("Data Submit"); 
  }
  console.log(taskdoc);
  
 const handleInputChange =(event,value) =>{ 
  console.log("text",value);
  console.log(usetask);
 setvd1(value);
 }
 function openModal(e){
    let ram=e;
    console.log(ram);
     
     setIsOpen(true);
   }
// }
 console.log("type",vd1);
 console.log(val);
 console.log(taskdoc);
 //Modal for Other
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = 'white';
}
function closeModal(){
  setIsOpen(false);
}
console.log("usetask1",usetask);
const onSubmitTask=(e)=>
{
  e.preventDefault();
taskdoc.push({"tname":usetask});
console.log(taskdoc);
settaskdoc(taskdoc);
setIsOpen(false);
db.collection("task")
.doc()
.set({
  taskname:usetask,
})
.then(function () {
  console.log("Value successfully written!");
Data1();
})
.catch(function (error) {
  console.error("Error writing Value: ", error);
});
}
console.log("usetask2",usetask);
console.log(usetask);
console.log(taskdoc);


    return(
   <Container className="mt--108 pb-5 ml--30">
    <br></br>
       <Row className="justify-content-center">
       <form className="design1">
  <br></br>
  <div className="form-row pl-4">
  <div className="form-group col-md-5">
      <label for="inputState">Project</label>
      <Input type="select" name="select" id="exampleSelect1" onChange={e=>{
        let demo=JSON.parse(e.currentTarget.value);
      console.log("onchange1",demo);
             setpname(demo.pname)
             setpid(demo.id)}}> 
              <option value="">Select Project</option> 
              { project.map(dropdown => {            
           return <option key={dropdown} dropdown={dropdown} value={JSON.stringify(dropdown)} >{dropdown.pname}
              </option>;
              // 
           })
       }             
       </Input>
    </div>
    <div className="form-group col-md-5">
      <label for="inputState">Employee</label>
      <Input type="select" name="select" id="exampleSelect2" onChange={e=>{
         let demo1=JSON.parse(e.currentTarget.value);
         console.log("onchange2",demo1);
             setemp(demo1.pname)
             seteid(demo1.id)}}> 
              <option value="">Select Employee</option>                     
          { empdoc.map(dropdown => {           
        return <option key={dropdown} dropdown={dropdown}  value={JSON.stringify(dropdown)}>{dropdown.pname}
           </option>;         
        })
    }         
       </Input>     
    </div>   
        </div>
        <div className="autodiv">
          
           <Autocomplete 
           value={val}
          onInputChange={handleInputChange}
          onChange={(e,v)=>
          {
            
            console.log("select",v);
            console.log(v.tname);
            if(v.tname=="Other")
            {
              openModal(e);
            }
            else{
           console.log("hello",v.tname);
          // settaskval(v);
         console.log( typeof(v.tname));
          setval(v);
            }
          }}  
         
    options={taskdoc}
    getOptionLabel={(option) => option.tname}
    // defaultValue={taskdoc.find(taskdoc => taskdoc.tname[0])} 
    style={{ width: 300 }}
    renderInput={params => (     
      <TextField
        {...params}
        label="Task"
        variant="outlined"
        fullWidth
      />
    )}
  />
  </div>
  <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          contentLabel="Example Modal"
        >
          <form>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Task</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="Task"
             value={usetask}
             onChange={e=>{
            console.log(e.currentTarget.value);
        //  setField(e.currentTarget.value,{usetask});
       
           setusetask(e.currentTarget.value)}}/>
          </div>
          <div className="div">
        <button onClick={onSubmitTask} type="submit" className="btn btn-primary">Submit</button>
        </div>
        <br></br>
         <div className="div2">
           <button  onClick={closeModal} className="btn btn-primary">close</button>
           </div>
          </form>
        </Modal>
          <div className="form-group col-md-5">
          <label for="inputAddress2">Task Created Date</label>
          <input type="date" className="form-control" id="inputAddress2" placeholder=""
           value={date2}
           onChange={e=>
           setdate2(e.currentTarget.value)}/>
        </div>
       
        <div className="form-group col-md-5">
          <label for="inputAddress2">Task Completion Date</label>
          <input type="date" className="form-control" id="inputAddress3" placeholder="DD/MM/YYYY "
           value={date1}
           onChange={e=>
           setdate1(e.currentTarget.value)}/>
        </div>
       
          <div className="form-group col-md-6">
    <label for="inputAddress">Task Discription</label>
    <input type="textarea" className="form-control" id="inputAddress" placeholder="Discribe Task"
     value={taskd}
     onChange={e=>
     settaskd(e.currentTarget.value)}/>
  </div>
  <div className="form-group col-md-5">
      <label for="inputState">Status</label>    
      <Input type="select" name="select" id="exampleSelect3" onChange={e=>
             setstatus(e.currentTarget.value)}> 
              <option value="">Select Status</option>                 
         <option value="start" >start</option>
         <option value="progress">progress</option>
         <option value="end">end</option>            
       </Input>
    </div>   
    <br></br>
    <div className="div">
        <button onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
 </Row>
      </Container>           
          )
        }
export default AssignProject;