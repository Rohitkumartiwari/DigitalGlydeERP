import { useHistory } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import React from "react";
// import AdminNavbar from"../components/Navbars/AdminNavbar.js";

import Modal from "react-modal";
import { Button, Card, CardBody, Row, Container ,Table} from "reactstrap";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
// import Header from "components/Headers/Header.js";
import firebase from "../firebase";
const Index = () => {
  let subtitle;
  const [documents, setDocuments] = useState([]);
  const [data, setData] = useState([]);
  const [prodata, setprodata] = useState([]);
  const [num, setnum] = useState([]);
  const [group, setGroup] = useState([]);
  const [document, setDocument] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [inform, setInform] = useState([]);
  const [change, setChange] = React.useState(true);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  console.log("inform",inform);
  
  function openModal(document) {
    let doc = document;
    setDocument(doc);
    console.log("helo", doc);
    console.log("document",document);
    var info1 = group.filter((a) => a.name == document.name);
    console.log("info", info1);
    
    setInform(info1);
    
    setIsOpen(true);
    setChange(!change);
  }
  function closeModal() {
    console.log("hii");
    setIsOpen(false);
  }

  React.useEffect(() => {
    db.collection("proview")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,
            pname: doc.data().pname,
          })
        );
        setDocuments(arr);
        console.log("hii", arr);
        setChange(!change);
      });
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
        );
        setprodata(arr);
        setChange(!change);
        const grouped = _.groupBy(arr, "ename");

        console.log("grouped",grouped);
        var res = Object.keys(grouped).map((i) => {
          return {
            name: i,
            count: grouped[i].length,
            detail: grouped[i],
            status:grouped[i].status
          };
        });
        console.log("res",res);

        setGroup(res);
      });
    db.collection("Profile")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,
            firstname: doc.data().firstname,
          })
        );
        setData(arr);
        setChange(!change);
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("data", user.email);
          console.log("data", user.uid);
          // console.log("data",user.ProviderId);
          console.log("user is same");
        } else {
          history.push("/auth/login");
        }
      });
  }, []);
  console.log("prodata",prodata);
  console.log("inform",inform);

  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  if (user) {
    console.log(user);
  }
 
  function onOut(){
    console.log("out");
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          alert("you are log out");
        },
        function (error) {
          alert("you are logged in");
        }
      );
    history.push("/auth/login");
  };
  //Group By
  console.log("group",group);

  // console.log(document);
  // var info1=group.filter((a)=>a.name==document.name);
  // console.log("info",info1);
  // console.log(info1);
  // setInform(info1);
  console.log(inform);
  return (
    <Container className="mt--8 pb-5 ml--30">
      {/* <AdminNavbar/> */}
      <Row className="justify-content-center">
        <Container className="mt--5" fluid>
          <div>
            <div className="row">
              {documents.map((document) => (
                <div className="column">
                  <Card className="bg-secondary shadow border-0 card1">
                    <CardBody className="px-lg-5 py-lg-5">
                      <br></br>

                      <h1>{document.pname}</h1>
                      <br></br>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          {group.map((document) => (
            <>
              <ul className="list-group">
                <li
                  onClick={() => openModal(document)}
                  className="list-group-item"
                >
                  {document.name}{" "}
                  <span className="badge badge-primary badge-pill">
                    {document.count}{" "}
                  </span>
                </li>
              </ul>
            </>
          ))}
        </div>
      </Row>
      <div>
        <Button
          onClick={onOut}
          className="my"
          color="primary"
          type="button"
        >
          LogOut
        </Button>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal1"
        >
           <h1> Project name with status :</h1>
         <Table className="dtable">
        
         <thead >
        <tr >
        <td >Project Name</td> 
        <td>Status </td>
          
        </tr> 
       </thead>
              
              <tbody>
              {inform.map((i) => (
                
                i.detail.map((j) => (
                  <>
                  <tr key={document.id} >
         
         <td> {j.pname} </td>
         <td> {j.status} </td>
      </tr>
                   
                  </>
                ))
              
              ))}
            </tbody>
             </Table>
          <div className="div2">
            <button onClick={closeModal} className="btn btn-primary1">
              close
            </button>
          </div>
        </Modal>
      </div>
    </Container>
  );
};
export default Index;
