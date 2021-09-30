/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import React, { useEffect,useState } from 'react';
import {auth} from "../../firebase.js";
import firebase from "../../firebase.js";
import {db} from "../../firebase.js";
const AdminNavbar = (props) => {
  const [documents,setDocuments]=useState([]);
 const[data,setData]=useState([]);
  
  //useEffect
  useEffect(() => {
    
    db.collection("userData")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>     
        arr.push({
             id: doc.id,
      name: doc.data().name,
      email:doc.data().email
    })         
      )    
      setDocuments(arr);
      console.log("docu",documents);
      console.log("hii",arr);
    });
    console.log("docu",documents);
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     console.log("docu",documents);
  //     console.log("data",user.email);    
  //     var info1=documents.filter((a)=>a.email.includes(user.email));
  //     setData(info1);
  //     console.log("jan",info1);
  //    console.log("user is same");  
  //   } else {
  //     console.log("user is different");  
  //   } })
  const user = firebase.auth().currentUser;

if (user) {
 console.log("current user");
 const email = user.email;
 console.log("current email",email);
 const name = user.name;
 console.log("current name",name);
 const uid = user.uid;
 console.log("current uid",uid);
} else {
  // No user is signed in.
}
},[db])
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                 
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    
                    {data.map((document) => (
      
      <div key={document.id}>
         <h1> Hello! {document.name}</h1>
        
     </div>
   )) }
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              {/* <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu> */}
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
