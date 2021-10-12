import React from "react";
import {storage} from "../firebase";
import { useState } from "react";
 const Projectdatatab=()=>
 {
//    const[url1,seturl]=useState([]);
    var storageRef = storage.ref();
    console.log(storageRef);
    //urll is the url for image
    storageRef.child('/files/IMG_20210730_222533.jpg').getDownloadURL().then(function(url) {
      // Or inserted into an <img> element:
      console.log(url);
    //   seturl(url);
      var test1 = url;
      console.log(test1);

    //   alert(url);
      document.querySelector('img').src = test1;
      console.log(document.querySelector('img').src);
    }).catch(function(error) {
      // Handle any errors
    });
    // console.log(document.querySelector('img').src);
     return(
         <h1>
             <img src="test1" height="125px" width="200px" alt="firebase-image"/> 
           
         </h1>
     )
 }
 export default Projectdatatab;