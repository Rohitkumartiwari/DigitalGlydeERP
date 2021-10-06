/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import EmpDetail from "views/examples/ProDetail";
import MonthlyDetail from "views/examples/MonthlyDetail";
import Project from "views/examples/Project.js";
import AssignProject from "views/examples/AssignProject.js";
import Employee from "views/examples/Employee.js"
import Projectpage from "views/examples/Projectpage.js"
var routes = [
  
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/project",
    name: "Project",
    icon: "ni ni-collection text-pink",
    component: Project,
    layout: "/admin",
  },
  {
    path: "/Assignproject",
    name: "Assign Project",
    icon: "ni ni-paper-diploma text-primary",
    component: AssignProject,
    layout: "/admin",
  
},
{
  path: "/Employee",
  name: "Employee Detail",
  icon: "ni ni-paper-diploma text-primary",
  component: Employee,
  layout: "/admin",

},
  {
   path: "/prodetail",
    name: "Project Detail",
    icon: "ni ni-chart-pie-35 text-pink",
    component: EmpDetail,
    layout: "/admin",
  }, 
  // {
  //   path: "/projectpage",
  //    name: "Project Data",
  //    icon: "ni ni-chart-pie-35 text-pink",
  //    component: Projectpage,
  //    layout: "/admin",
  //  }  
];
export default routes;

