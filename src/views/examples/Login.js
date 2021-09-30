import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {db} from "../../firebase.js";
import {auth} from "../../firebase.js";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import firebase from "../../firebase.js";
const Login = () => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[document,setDocuments]=useState([]);
  const history=useHistory();
  // useEffect(()=>
  // {
  //   db.collection("userData")
  //   .get()
  //   .then((querySnapshot) => {
  //     let arr = [];
  //     querySnapshot.docs.map((doc) =>       
  //       arr.push({
  //            id: doc.id,
  //         email:doc.data().email,
  //          role: doc.data().role,
  //         })           
  //     )     
  //     setDocuments(arr);
  //     console.log("hii",arr);
     
  //   });
  // },[]);
  console.log(document);
  // const user = firebase.auth().currentUser;
  // if (user) {
  //   console.log("username",user.email);
  //   history.push("/admin/index");
  // } else {
  //   console.log("no");
  //   history.push("/auth/login");
  // }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("data",user.email);
      console.log("data",user.name);
     console.log("user is same");
     history.push("/admin/index");
    } else {
      console.log("user is different");
    }
  })
  
  const onLogin=(e)=>
  {
   
    e.preventDefault();
    
    auth.signInWithEmailAndPassword(email, password).then(res => {
     
      if(res)
      {

db.collection("userData").where("email", "==", res.email)
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().role);
        if(doc.data().role=="user")
        {
         history.push("/user/index") ;
        }
        else{
          history.push("admin/index")
        }
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
        history.push("/admin/index");
      }
  }).catch(err => {
      alert("enter email and password");
  })
 
  }
  
 
  const onNew=(e)=>
  {
    e.preventDefault();
   
   
  }
console.log(document);
  return (
    <React.Fragment>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={e=>
                    setEmail(e.currentTarget.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e=>
                    setPassword(e.currentTarget.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button  onClick={onLogin} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
             
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={onNew}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
      </React.Fragment>
  );
};

export default Login;


