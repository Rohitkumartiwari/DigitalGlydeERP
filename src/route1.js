import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";

var route1 = [
    {
        path: "/login",
          name: "Login",
          icon: "ni ni-key-25 text-info",
          component: Login,
          layout: "/auth",
    },
    {
        path: "/register",
          name: "Register",
          icon: "ni ni-paper-diploma text-pink",
          component: Register,
          layout: "/auth",
    },
    
];

export default route1;