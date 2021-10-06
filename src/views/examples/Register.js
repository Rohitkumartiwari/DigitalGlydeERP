import React,{useState} from"react";
import { useHistory } from "react-router-dom";
import {auth} from "../../firebase.js";
import firebase from "../../firebase.js";
import {db} from "../../firebase.js";
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

const Register = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  
  const history=useHistory();
  const onLogin=(e)=>
  {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then(res => {
      history.push("/auth/login");
      if(res)
      {
        
      }
    }).catch(err => {
      alert("enter new name and password");
    })
    db.collection("userData").add({
      name: name,
      email: email,
      password:password,
      role:"user",
      createdOn:new Date(),
      updatedOn:new Date(),
  })
  .then((docRef) => {
      alert("Data Successfully Submitted");
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });  
  db.collection("empData").add({
    name: name,
    email: email,
    createdOn:new Date(),
    updatedOn:new Date(),
})
.then((docRef) => {
  
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
}

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("data",user.email);
      
     console.log("user is same");
     history.push("/admin/index");
    } else {
      console.log("user is different");
    }
  })
 
  return (
    <React.Fragment>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text"  value={name}
                    onChange={e=>
                    setName(e.currentTarget.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
              <div className="text-center2">
                <Button onClick={onLogin}className="mt-4" color="primary" type="button">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </React.Fragment>
  );
};

export default Register;
