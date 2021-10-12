import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from "reactstrap";
import Box from "@material-ui/core/Box";
import Projectdatatab from "../../tabs/Projectdatatab.js"
import Projectdoctab from "../../tabs/Projectdoctab.js"
import Addtasktab from "../../tabs/Addtasktab.js"
const Projectpage=(props)=>
{
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    console.log(props.location.state.data);
return(
  <div >
      <Container className="cont">
          <h1>Project Tab</h1>
          
          <Box sx={{ width: '100%', typography: 'body1',backgroundColor:'' }}>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor: 'wheat' }}>  
         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Project Detail" />
          <Tab label="Project Document"  />
          <Tab label="Add Task" />
        </Tabs>
       </Box>
      {value ===0 &&<Projectdatatab {...props}/> }
      {value ===1 &&<Projectdoctab/> }
      {value ===2 &&<Addtasktab {...props}/> }
     
      </Box> 
      </Container>
  </div>
)
}
export default Projectpage;
 