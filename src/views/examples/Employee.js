import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import Moment from "moment";
import MaterialTable from "material-table";

import { Input, Row, Col, Container, Modal } from "reactstrap";
import { Table } from "reactstrap";

const Employee = (e) => {
  const db = firebase.firestore();
  var subtitle;
  const [document, setDocument] = useState({});
  const [info, setInfo] = React.useState([]);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [date, setdate] = useState("");
  const [address, setaddress] = useState("");
  const [tech, settech] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data1, setData1] = useState([]);
  const columns = [
    {
      title: "First Name",
      field: "firstname",
      cellStyle: {
        minWidth: 60,
        maxWidth: 60,
      },
    },
    {
      title: "Last Name",
      field: "lastname",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: "Email",
      field: "email",
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
    {
      title: "Mobile No",
      field: "mobile",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: "Date",
      field: "date",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: "Address",
      field: "address",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: "Technical Skills",
      field: "tech",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
  ];

  useEffect(() => {
    db.collection("Profile")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,

            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            mobile: doc.data().mobile,
            date: doc.data().date,
            address: doc.data().address,
            tech: doc.data().tech,
          })
        );
        setData1(arr); 
        setInfo(arr);
        console.log("hii", arr);
      });
  }, []);

  console.log(info);
 
  return (
    <>
      <div className="form-group col-md-5"></div>

      <br></br>
      <div className="form-group col-md-6">
        <MaterialTable
          ml={3}
          title=""
          style={{ width: 1200, height: 600 }}
          data={data1}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRow = [...data1, newRow];
                console.log(updatedRow);
                setData1(updatedRow);
                resolve();
                console.log(newRow);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                console.log(index);
                const updatedRow = [...data1];
                updatedRow.splice(index, 1);
                setData1([...updatedRow]);
                resolve();
                console.log(data1);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                console.log("updated row", updatedRow);
                console.log("old row", oldRow);
                const updatedRows = [...data1];
                updatedRows[index] = updatedRow;
                setData1([...updatedRows]);
                resolve();
              }),
          }}
          options={{
            rowStyle: {
              fontSize: 18,
            },
            headerStyle: {
              fontSize: 18,
            },
            searchFieldStyle: {
              fontSize: 18,
            },
            actionsColumnIndex: -1,
          }}
        />
      </div>
    </>
  );
};
export default Employee;
