import React from "react";
// import "../../index.css";
import {
    Container,
   Table,
    CardHeader,
       Card,
       
     } from "reactstrap";
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  import Header from "components/Headers/Header.js";
  const pdata = [
    {
      name: 'Python',
      student: 2,
      fees: 10
    },
    {
      name: 'Javascript',
      student: 15,
      fees: 12
    },
    {
      name: 'PHP',
      student: 5,
      fees: 10
    },
    {
      name: 'Java',
      student: 10,
      fees: 5
    },
    {
      name: 'C#',
      student: 9,
      fees: 4
    },
    {
      name: 'C++',
      student: 10,
      fees: 8
    },
  ];
  
  function Table2 (){
    return (
      <>
       <Header />
       <Container className="themed-container" fluid>
       
  <row>
    <div className="col">
  <Card className="shadow">
  
    <CardHeader className="border-0">
    <h3 className="mb-0">Card tables</h3>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
    <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Student</th>
                      <th scope="col">Fees</th>
                     
                    </tr>
                  </thead>
                  <tbody>
               
        {pdata.map((item) => (
          <tr key={item}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
                  </tbody>
    </Table>
  </Card>
    </div>
  </row>
  <Container>
      <Card className="bg-gradient-default shadow"  height="100%" >
   <CardHeader className="bg-transparent" height="100%">
        <h1 className="chart-heading">Line Chart</h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={pdata} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={'preserveStartEnd'}   />
            <YAxis  dataKey="student" />
            <Tooltip contentStyle={{ backgroundColor: 'white ' }} />
            <Legend />
            <Line type="monotone" dataKey="student" stroke="red" activeDot={{ r: 8 }} />
           
          </LineChart>
        </ResponsiveContainer> 
        </CardHeader>
        </Card>
        </Container>
        </Container>
      </>
    );
  }
  export default Table2