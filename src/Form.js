import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import './Nav.css'

function Form(){

  const[plant,setPlant]= useState(" ");
  const [imgfile,setImgfile]= useState(0);


    return(<div className="App">
       <div class="Form">

     <form>
      <p><strong>Upload Image of leaf:              </strong>
      <input type="file" name="imagefile" id="imgfile" onChange={(name)=>setImgfile(name.target.value)} required /></p>
      <p><strong>Select Plant:                      </strong>
      
      <select name="plant" id="plant" onChange={(name)=>setPlant(name.target.value)} required>
        <option value="">Tomato</option>
        <option value="">Papper Bell </option>
        <option value="">Potato</option>
      </select></p>
      <p><input type="submit" value="Submit" 
      onClick={()=>{axios.post("http://127.0.0.1:8000/test/",{data:0}).then(data=>console.log(data.data))}}/></p>

      <p><input type="reset" value="Reset" /></p>
     </form>
    
    </div>
  </div>
    );
}
export default Form;