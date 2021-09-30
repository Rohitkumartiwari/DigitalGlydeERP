import React from "react";
import {db} from "../../firebase.js";


 const Getdata2 = () => {
  const [documents, setDocuments] = React.useState([]);
  console.log("hello");
  React.useEffect(() => {
    db.collection("userData")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
        
          arr.push({
               id: doc.id,
        name: doc.data().name,
        email:doc.data().email
      })

            
        )
       
        setDocuments(arr);
        console.log("hii",arr);
      });
  }, []);
  return documents;
};
export default Getdata2;