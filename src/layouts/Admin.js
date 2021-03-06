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
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
// import Login from "../views/examples/Login.js"
import routes from "../routes.js";
import Projectpage from "../views/examples/Projectpage";
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return ( 
    <React.Fragment>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/cropped-digilogo-300x300.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        {/* <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        /> */}
        <Switch>
          {getRoutes(routes)}
         
         
    <Route
path="/admin/Projectpage" component={Projectpage} 
/>
<Redirect from="*" to="/admin/login" />
        </Switch>
        <Container fluid>
          {/* <AdminFooter /> */}
        </Container>
      </div>
      </React.Fragment>
  
  );
};

export default Admin;
