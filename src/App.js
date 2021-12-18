import React from 'react'
import { useState, useEffect } from "react";
import './App.css'
import Product from './contianers/Products'
 const App = () => {
  const [test,setTest]=useState(false);
   const [products, setProducts] = useState(null);
const [fields, setFields] = useState([]);
const [right,setRight]=useState({"rightFields":[],"rightList":[]})
//const [rightFields, setRightFields] = useState([]);
// const [leftList,setLeftList] = useState(null)
let [leftList, setLeftList] = useState([]);
// const [rightList, setRightList] = useState([]);
//let rightList=[];

let fileReader;

useEffect(() => {
 if (products !== null) {
   const arrayProduct = Object.keys(products);
   if (arrayProduct.length > 0) {
     const product = products[arrayProduct[0]];
     //console.log(product);
     const arr = Object.keys(product);
     setFields(arr);

     const temp = [];
     for (let i = 0; i < arr.length; i++) {
       temp.push({
         name: arr[i],
         selected: false,
       });
     }
     //console.log(temp);
     setLeftList(temp);
   }
 }
}, [products]);

const handleFileRead = (e) => {
 const content = fileReader.result;
 // console.log("displaying content");
 const obj = JSON.parse(content);
 setProducts(obj.products);
 // … do something with the 'content' …
};

const handleFileChosen = (file) => {
 fileReader = new FileReader();
 fileReader.onloadend = handleFileRead;
 fileReader.readAsText(file);
 // console.log(file);
};

const toggleSelection = (e) => {
 const element = e.target;
 const name = e.target.getAttribute("name");
// console.log("toggling");
 //console.log(leftList);

 const temp = [];
 for (let i = 0; i < leftList.length; i++) {
   if (leftList[i].name === name) {
     if (leftList[i].selected === true) {
       temp.push({
         name,
         selected: false,
       });
       element.classList.remove("selected");
     } else {
       temp.push({
         name,
         selected: true,
       });
       element.classList.add("selected");
     }
   } else {
     temp.push({
       ...leftList[i],
     });
   }
 }
 setLeftList(temp);
};
const toggleSelectionRight=(e) => {
const element = e.target;
const name = e.target.getAttribute("name");
//console.log(name);
//console.log(right.rightList[0])
//console.log(right.rightList);

const temp = [];

for (let i = 0; i < right.rightList.length; i++) {
 if (right.rightList[i].name === name) {
   //console.log("name match")
   if (right.rightList[i].selected === true) {
     temp.push({
       name,
       selected: false,
     });
     element.classList.remove("selected");
   } else {
     temp.push({
       name,
       selected: true,
     });
     element.classList.add("selected");
   }
 } else {
  // console.log("in this")
   temp.push(right.rightList[i])
  
 }
}
//console.log(temp);
setRight({"rightFields":[...right.rightFields],"rightList":[...temp]})
}
const moveToRight = () => {
 const temp = []
 const t=[]
 leftList.forEach( obj => {
   if(obj.selected === true && !right.rightFields.includes(obj.name)){
     temp.push(obj.name);
     t.push({...obj,selected:false})
   }
 })
 
 setRight({"rightFields":[...right.rightFields,...temp],"rightList":[...right.rightList,...t]})
 
}
const moveToLeft = () => {
 const temp = []
 const t=[]
 right.rightList.forEach( obj => {
   if(obj.selected ===false){
     temp.push(obj.name);
     t.push({...obj})
   }
 })
 
 setRight({"rightFields":[...temp],"rightList":[...t]})
 
}
return (
 <div className='wrapper'>
   <div className="container-top">
     <div className="container-step-1">
       <div className="col-1">Step 1:</div>
       <div className="col-2">
         <p>Select File</p>
         <input
           type="file"
           id="file"
           className="input-file"
           onChange={(e) => handleFileChosen(e.target.files[0])}
         />
         <p>Supported File Type(s): .CSV, .JSON</p>
       </div>
     </div>

     <div className="container-step-2">
       <div className="col-1">Step 2:</div>
       <div className="col-2">
         <p>Specify Format</p>

         <div>
           <span>File Type</span>
           <select name="pets" id="pet-select">
             <option value="">--Please choose an option--</option>
             <option value="dog">Dog</option>
             <option value="cat">Cat</option>
             <option value="hamster">Hamster</option>
             <option value="parrot">Parrot</option>
             <option value="spider">Spider</option>
             <option value="goldfish">Goldfish</option>
           </select>
         </div>
         <div>
           <span>Character Encoding</span>
           <select name="pets" id="pet-select">
             <option value="">--Please choose an option--</option>
             <option value="dog">Dog</option>
             <option value="cat">Cat</option>
             <option value="hamster">Hamster</option>
             <option value="parrot">Parrot</option>
             <option value="spider">Spider</option>
             <option value="goldfish">Goldfish</option>
           </select>
         </div>
         <div>
           <span>Delimiter</span>
           <select name="pets" id="pet-select">
             <option value="">--Please choose an option--</option>
             <option value="dog">Dog</option>
             <option value="cat">Cat</option>
             <option value="hamster">Hamster</option>
             <option value="parrot">Parrot</option>
             <option value="spider">Spider</option>
             <option value="goldfish">Goldfish</option>
           </select>
         </div>
         <div>
           <span>Has Header</span>
           <input type="checkbox" />
         </div>
       </div>
     </div>
   </div>

   <div className="container-bottom">
     <div className="container-step-3">
       <div className="col-1">
         <p>Step 3:</p>
       </div>
       <div className="col-2">
         <p>Display Handling</p>
         <p>Select the fields to be displayed</p>
         <div className="table">
           <div className="table-col-1">
             <p>Available Fields</p>

             <div className="container-table-fields">
               {fields !== null &&
                 fields.map((field) => {
                   return (
                     <p
                       key={field}
                       onClick={(e) => toggleSelection(e)}
                       value={field}
                       name={field}
                     >
                       {field}
                     </p>
                   );
                 })}
             </div>
           </div>
           <div className="table-col-2">
             <button onClick={moveToRight}>{`>>`}</button>
             <button onClick={moveToLeft}>{`<<`}</button>
           </div>
           <div className="table-col-3">
             <p>Fields to be Displayed</p>
             <div className="container-table-fields">
               {right.rightFields.length > 0 && right.rightFields.map((field) => {
                 return (
                   <p
                       key={field}
                       onClick={(e) => toggleSelectionRight(e)}
                       value={field}
                       name={field}
                     >
                       {field}
                     </p> 
                 );
               })}
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   <div className="container-btn-action">
   <button onClick={()=>setTest(true)} className="btn-next">Next</button>
        <button onClick={()=>setTest(false)} className="btn-cancel">Cancel</button>
      </div>
      <div  className="container-productsTable">
      <div   className="container-productsTable">
      {test && <Product fields={right.rightFields}  items={products} />}
    </div>
    </div>
   
 </div>

);
}
export default App
