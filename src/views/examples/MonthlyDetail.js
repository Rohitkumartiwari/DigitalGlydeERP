// import React from "react";
// import  Getdata  from "./Getdata";
// import { Table } from 'reactstrap';
// import { useHistory } from "react-router-dom";
// import {firebase} from "../../firebase.js";
// import MaterialTable from 'material-table';
// import CustomDatePicker from"./CustomDatePicker.js";
// const MonthlyDetail = (props) => {
//   const [useData,setData]=useState([]);
//   const [data, setData2] = useState(data);
//   const documents = Getdata();
//   setData(documents);
//   const history=useHistory();
// console.log("doc",documents);
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log("data",user.email);
    
//    console.log("user is same");
 
//   } else {
//   history.push("/auth/login")
//   }
// });
// columns=[
//   { title: 'Date', field: 'date', type: "date",
//   dateSetting: { locale: "en-GB" },
//   filterComponent: (props) => <CustomDatePicker {...props} /> },
//   { title: 'Resource', field: 'resource' },
//   { title: 'Project', field: 'project'},
//   { title: 'Current Task', field: 'task'},   
//   { title: 'Created', field: 'create',dateSetting: {
//     format: 'dd/MM/yyyy'
//   },}
// ],
// data=[
//   {useData.map((document) => (
//     <div key={document.id}>
//    date: {document.date},
//    resource: {document.resource},
//     project: {document.project}, 
//     task: {document.task} ,
//     create:{document.created}
//     </div>
//   ))},
// ]  
 
//   return (
//     <MaterialTable
//     columns={columns}
//     data={data}
     
//     options={{ search: false, filtering: true }}
//     editable={{
//       onRowAdd: (newData) =>
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             setData2([...data, newData]);

//             resolve();
//           }, 1000);
//         }),
//       onRowUpdate: (newData, oldData) =>
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             console.log("old:", oldData);
//             console.log("new:", newData);
//             const dataUpdate = [...data];
//             const index = oldData.tableData.id;
//             dataUpdate[index] = newData;
//             setData([...dataUpdate]);

//             resolve();
//           }, 1000);
//         }),
//       onRowDelete: (oldData) =>
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             const dataDelete = [...data];
//             const index = oldData.tableData.id;
//             dataDelete.splice(index, 1);
//             setData2([...dataDelete]);

//             resolve();
//           }, 1000);
//         })
//     }}
//     />
//   )
// }
//  export default MonthlyDetail;
 
