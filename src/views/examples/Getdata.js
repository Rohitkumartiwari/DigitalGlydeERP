import React from "react";
import {db} from "../../firebase.js";


 const Getdata = () => {
  const [documents, setDocuments] = React.useState([]);
  
  React.useEffect(() => {
    db.collection("values")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
        
          arr.push({
               id: doc.id,
             date: doc.data().date,
            created:doc.data().created,
        resource:doc.data().resource,
            project:doc.data().project,
            task:doc.data().task})
            
        )
       
        setDocuments(arr);
        console.log("hii",arr);
      });
  }, []);
  return documents;
};
export default Getdata;