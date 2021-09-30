import React, { useEffect } from "react";
import '../../index.css';
import { useState } from "react";
import firebase from "../../firebase";
import {
    Input,
    Row,
    Container,
    Table
  } from "reactstrap";
const Project=()=>
{
  console.log("hii");
  const db = firebase.firestore();
  const[pname,setpname]=useState("");
  const[pdisc,setpdisc]=useState("");
  const [build, setbuild] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const[info,setInfo]=React.useState([]);
  const onSubmit=(e)=>
  {
    e.preventDefault();
    
    db.collection("proview")
      .doc()
      .set({
        pname: pname,
        build:build,
        pdisc:pdisc,
        estimatedate:date1,
        startdate:date2,
        updatedOn:new Date(),
        build:build,
      })
      .then(function () {
        console.log("Value successfully written!");
      window.location.reload();
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });     
     alert("Data Submitted");   
  } 
  useEffect(()=>
  {
    db.collection("proview")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>      
        arr.push({
             id: doc.id,
           pname: doc.data().pname,
           date1:doc.data(). estimatedate,
          
         })          
      )    
      setInfo(arr);
      console.log("hii",arr);
    });
  },[]);    
    return(
       
      <Container className="mt--108 pb-5 ml--30">
       <br></br>
          <Row className="justify-content-center">
          <form className="design">
              <br></br>
 
    <div className="form-group col-md-6">
      <label for="inputEmail4">Project Name</label>
      <input type="text" className="form-control" id="inputPro" placeholder="project name" value={pname}
                    onChange={e=>
                    setpname(e.currentTarget.value)}
/>
    </div>   
  <div className="form-group col-md-7">
    <label for="inputAddress">Project Discription</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="Discribe Project"
                        value={pdisc}
                        onChange={e=>
                        setpdisc(e.currentTarget.value)}
    />
  </div>
  <div className="form-group col-md-6">
    <label for="inputAddress2">Task Created Date</label>
    <input type="date" className="form-control" id="inputAddress2" placeholder=""
                        value={date2}
                        onChange={e=>
                        setDate2(e.currentTarget.value)}
    />
  </div>
  <div className="form-group col-md-6">
    <label for="inputAddress2">Task Completion Date</label>
    <input type="date" className="form-control" id="inputAddress1" placeholder=""
                        value={date1}
                        onChange={e=>
                        setDate1(e.currentTarget.value)}
    />
  </div>
    <br></br>    
    <div className="form-group col-md-5">
      <label for="inputState">Build Type</label>    
      <Input type="select" name="select" id="exampleSelect" onChange={e=>
             setbuild(e.currentTarget.value)}> 
              <option value="">Select Build</option>                 
         <option value="start">WEB</option>
         <option value="progress">MOBILE</option>
         <option value="end">IOS</option>            
       </Input>
    </div>   
 <div className="div2">
  <button onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button>
  </div>
  <br></br>
 <br></br>
 {/* <div>
  <Table >
    <thead >
        <tr>
           <td>Project</td>
         <td>Estimated date</td>       
        </tr>
        </thead>
    <tbody>
      {info.map((document) => (     
        <tr key={document.id}>         
          <td> {document.pname} </td>
           <td>{document.date1}</td>
           
        </tr>
     )) }
     
   </tbody>
      </Table>
             </div> */}
</form>

              </Row>  
             
          <section>
            
            </section>            
</Container>

     
    )
    
}
export default Project;