import Index from "views/Index.js";
import ProjectDetail from "views/examples/ProDetail";
var route2=[
    {
      
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/user",
      },
      {
        path: "/prodetail",
         name: "Project Detail",
         icon: "ni ni-chart-pie-35 text-pink",
         component: ProjectDetail,
         layout: "/user",
       }
  ];
  export default route2;