import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import {db} from "../../firebase.js";
import "../../index.css";
import { Table } from 'reactstrap';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import Projectpage from "views/examples/Projectpage.js"
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
  const history = useHistory();
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
 
  { title: 'Status', field: 'status' , cellStyle: {
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

// function openModal(document) {
//   // console.log("doc",document);
//   let doc=document;
//   console.log("doc",doc);
//   setDocument(doc);
//   setIsOpen(true);
// }
// function afterOpenModal() {
//   // references are now sync'd and can be accessed.
//   subtitle.style.color = 'white';
// }
// function closeModal(){
//   setIsOpen(false);
// }
// async function delete1()
// { 
//     const del = await db.collection('AssignProject').doc(document.id).delete(); 
//     console.log("delete",del);
// }
// function setField(e,name1)
// {
//   console.log("doc1",document);
//   let doc=document;
//   doc[name1]=e;
//   console.log("doc2",doc);
//   setDocument(doc);
//   console.log(document);
//   setChange(!change);
// };
// async function update()
// {
//   console.log("doc",document);
//   const res=   db.collection('AssignProject')
//   .doc(document.id);
//   console.log(document.date2);
//   const res1=await res.update({
//    startdate:document.date2,
//    estimatedate:document.date1,
//    status:document.status,
//    Projectname:document.pname,
//    Employee:document.emp,
//   });
//   console.log("date2",document.date2);  
// }
console.log(data1);
// function openRightDrawer(event,rowData)
// {
//   console.log("hello");
  
//   console.log();
// }
    return(
      <div className="form-group col-md-5">
     
       <br></br>
        <MaterialTable title="Material Table" style={{ width: 1170 ,height:600}}
        onRowClick={(e,rowData) => {history.push({ pathname: '/admin/Projectpage',
        state: {
          data: rowData,
        },})}
      }
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

