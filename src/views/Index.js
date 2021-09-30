import { useHistory } from "react-router-dom";
import { useState } from "react";
import _ from 'lodash';
import React from "react";
// import AdminNavbar from"../components/Navbars/AdminNavbar.js";



import {
  Button,
  Card,
 
  CardBody,

  Row,
  
  Container
} from "reactstrap";


// import Header from "components/Headers/Header.js";
import firebase from "../firebase";
const Index = () => {
  const[documents,setDocuments]=useState([]);
  const[data,setData]=useState([]);
  const[prodata,setprodata]=useState([]);
  const[num,setnum]=useState([]);
  const[group,setGroup]=useState([]);
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
        )      
        setDocuments(arr);
        console.log("hii",arr);
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
           })           
        )      
        setprodata(arr);
        const grouped = _.groupBy(arr,"ename");
        console.log(grouped);
        
        console.log(grouped.rohit.length);
        console.log("hii",arr);
        var res = Object.keys(grouped).map((i)=>
        {
          return{
            name:i,
            count:grouped[i].length
           
          }
        })
        console.log(res);
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
    )
       setData(arr); 
               
      })
  }, []);
  console.log(prodata);
  

  const history=useHistory();
  const db = firebase.firestore(); 
  const user=firebase.auth().currentUser;
  if(user)
  {
    console.log(user);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("data",user.email);
      console.log("data",user.uid);
      // console.log("data",user.ProviderId);
     console.log("user is same");    
    } else {
    history.push("/auth/login")
    }
  })
  const onOut=()=>
  {
    firebase.auth().signOut().then(function() {
     alert("you are log out");
    }, function(error) {
     alert("you are logged in");
    });
    history.push("/auth/login");
  }
  //Group By
 console.log(group);
console.log(typeof(group));
  return (    
      <Container className="mt--8 pb-5 ml--30">
        {/* <AdminNavbar/> */}
          <Row className="justify-content-center">
          <Container className="mt--5" fluid>   
          <div>
          <div className="row" >
            {documents.map((document=>             
             <div className="column">
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>{document.pname}</h1>
            <br>
            </br>          
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
            {group.map((document=> 
              <div>           
<ul class="list-group">
  <li class="list-group-item">{document.name}  <span class="badge badge-primary badge-pill"  >{document.count} </span></li> 
</ul>       
     </div>   
      ))}     
      </div>
 
          </Row>
         <diV>
          <Button  onClick={onOut} className="my" color="primary" type="button">
                  LogOut
                </Button>
                </diV>
 </Container>    
  );
};
export default Index;


