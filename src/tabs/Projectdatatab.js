import React from "react";
 const Projectdatatab=(props)=>
 {
     console.log(props.location.state.data);
     return(
         <h1>
              Project name is --{props.location.state.data.pname}
          <br></br>
            Assign to --{props.location.state.data.emp}
            <br></br>
            Current task--{props.location.state.data.task}
            <br></br>
             task desc--{props.location.state.data.taskdisc}
            <br></br>
             task status--{props.location.state.data.status}
            
         </h1>
     )
 }
 export default Projectdatatab;