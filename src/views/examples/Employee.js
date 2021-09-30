import React,{useState,useEffect}from "react";
import firebase from "../../firebase";
import Moment from 'moment';
import MaterialTable from 'material-table';

import {
    Input,
    Row,
    Col,
    Container,
    Modal
  } from "reactstrap";
  import { Table } from 'reactstrap';
//   import MaterialTable from "material-table"; 
// import Table from '@material-ui/core/Table';

const Employee=(e)=>
{
    
    const db = firebase.firestore();
    var subtitle;
    const[document,setDocument]=useState({});
    const[documents,setDocuments]=useState([]);
    const[filterdoc,setfilterdoc]=useState("");
    const[info,setInfo]=React.useState([]);
    const[firstname,setfirstname]=useState("");
    const[lastname,setlastname]=useState("");
    const[email,setemail]=useState("");
    const[mobile,setmobile]=useState("");
    const[date,setdate]=useState("");
    const[address,setaddress]=useState("");
    const[tech,settech]=useState("");
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [data1,setData1]=useState([]);
    const columns = [
      { title: 'First Name', field: 'firstname', cellStyle: {
        minWidth: 60,
        maxWidth: 60
      } },
      { title: 'Last Name', field: 'lastname', cellStyle: {
        minWidth: 150,
        maxWidth: 150
      } },
      { title: 'Email', field: 'email', cellStyle: {
        minWidth: 250,
        maxWidth: 250
      } },
      { title: 'Mobile No', field: 'mobile' , cellStyle: {
        minWidth: 150,
        maxWidth: 150
      }},
      { title: 'Date', field: 'date', cellStyle: {
        minWidth: 150,
        maxWidth: 150
      } },
      { title: 'Address', field: 'address' , cellStyle: {
        minWidth: 150,
        maxWidth: 150
      }},
      { title: 'Technical Skills', field: 'tech' , cellStyle: {
        minWidth: 150,
        maxWidth: 150
      }},
      
    ]
    function openModal(document) {
        // console.log("doc",document);
        let doc=document;
        console.log("doc",doc);
        setDocument(doc);
        setIsOpen(true);
      }
 const addDetail=(e)=>
    {
        openModal(e);
    }
function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'white';
      }
 function closeModal(){
        setIsOpen(false);
      }
      // SUBMIT BUTTON
const onSubmit=(e)=>
      {
e.preventDefault();

db.collection("Profile")
.doc()
.set({
  firstname: firstname,
  lastname:lastname,
  email:email,
  mobile:mobile,
  date:date,
  address:address,
  tech:tech,
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
        db.collection("Profile")
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.docs.map((doc) =>      
            arr.push({
                 id: doc.id,
              
               firstname: doc.data().firstname,
               lastname:doc.data().lastname,
               email:doc.data().email,
               mobile:doc.data().mobile,
               date:doc.data().date,
               address:doc.data().address,
               tech:doc.data().tech,
              
             })  
                     
          ) 
          setDocuments(arr);
          setData1(arr);
          setfilterdoc(arr);   
          setInfo(arr);
          console.log("hii",arr);
        });
        
      },[]); 
  
      console.log(info);
      console.log(filterdoc);
      //Delete

      async function delete1()
{ 
    const del = await db.collection('Profile').doc(document.id).delete(); 
    console.log("delete",del);
    alert("Employee Data Deleted");
    window.location.reload();
}
return(
    <>
     <div className="form-group col-md-5"></div>
   {/* <br></br>
    <div className="emp">
    <button  onClick={addDetail} className="btn btn-light">Add Employee</button>
    </div>
    <div className="form-group col-md-5">
      <label for="inputState">Employee</label>
      <Input type="select" name="select" id="exampleSelect3" onChange={(e)=>{       
         if(e.currentTarget.value=="")
         {
           setInfo(filterdoc);
         }
         else{
          let demo1=JSON.parse(e.currentTarget.value);
          var info1=filterdoc.filter((a)=>a.firstname==demo1.firstname);            
          console.log("info",info1);
          setInfo(info1);
          console.log("onchange2",demo1);
         }       
            }}> 
              <option value="">All Employee Detail</option>                   
          { documents.map(dropdown => {           
        return <option key={dropdown} dropdown={dropdown}  value={JSON.stringify(dropdown)}>{dropdown.firstname}
           </option>;         
        })
    }         
       </Input>   
       <br></br>
       <br></br>

        
   
            </div>  
            <br></br>
            <Table className="table1" >
    <thead >
        <tr >
        <td >First Name</td> 
        <td>Last Name </td>
          <td>Email</td>          
          <td>Mobile No</td>
          <td>Date</td>
          <td>Address</td>
          <td>Technical Skill</td>
        </tr> */}
        {/* </thead>
    <tbody>
      {info.map((document) => (     
        <tr key={document.id} onClick={()=>openModal(document)} >
         
           <td> {document.firstname} </td>
           <td> {document.lastname} </td>
          <td> {document.email} </td>
          
          <td> {document.mobile} </td>
          <td> {Moment(document.date).format("MMMM D,YYYY")} </td>
          <td> {document.address} </td>
          <td> {document.tech} </td>        
        </tr>
     )) }
     
  //  </tbody> */}
  {/* //     </Table> */}
  {/* //     <Modal */}
  {/* //         isOpen={modalIsOpen}
  //         onRequestClose={closeModal}
  //         onAfterOpen={afterOpenModal}
  //         contentLabel="Example Modal1"
  //       > */}
             {/* <div className="div">
        <button onClick={onSubmitTask} type="submit" className="btn btn-primary">Submit</button>
        </div> */}
        {/* <form className="form">
           
        <div className="form-group col-md-6">
            <label for="inputEmail4">First Name :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter first name"
             value={document.firstname}
             onChange={e=>{
                setfirstname(e.currentTarget.value)}}
           />
           </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Last Name :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter last name"
             value={document.lastname}
             onChange={e=>{
            console.log(e.currentTarget.value);
           setlastname(e.currentTarget.value)}}/>
           </div>
           
           <div className="form-group col-md-6">
            <label for="inputEmail4"> Email :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter email address"
             value={document.email}
             
             onChange={e=>{
            console.log(e.currentTarget.value);
           setemail(e.currentTarget.value)}}/>
           </div>
           <div className="form-group col-md-6">
            <label for="inputEmail4"> Mobile Number :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter number"
             value={document.mobile}
             onChange={e=>{
            console.log(e.currentTarget.value);
           setmobile(e.currentTarget.value)}}/>
           </div>
           <div className="form-group col-md-5">
          <label for="inputAddress2">Joining Date :</label>
          <input type="date" className="form-control" id="inputAddress2" placeholder="" 
           value={document.date}
           onChange={e=>
           setdate(e.currentTarget.value)}/>
        </div>
        <div className="form-group col-md-6">
            <label for="inputEmail4"> Address :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter  address"
             value={document.address}
             onChange={e=>{
            console.log(e.currentTarget.value);
           setaddress(e.currentTarget.value)}}/>
           </div>
           <div className="form-group col-md-6">
            <label for="inputEmail4">Technology :</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="enter technology"
             value={document.tech}
             onChange={e=>{
            console.log(e.currentTarget.value);
           settech(e.currentTarget.value)}}/>
           </div>
            </form>
        <br></br>
        <div className="buttondiv3">
           <button  onClick={onSubmit} className="btn btn-primary">Submit</button>
          
           <button  onClick={closeModal} className="btn btn-primary">close</button>
           <button  onClick={delete1} className="btn btn-primary">Delete</button>
           </div>
            </Modal> */}
            <br></br>
            <div className="form-group col-md-6">
           
            
        <MaterialTable title="" style={{ width: 1200 ,height:600}}
        
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
    </>
    
)
}
export default Employee;