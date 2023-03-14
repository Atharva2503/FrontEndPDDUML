import React, { Component }  from 'react';
import { useState } from 'react';
import './App.css';
import Form from './Form';
import Profile from './Profile';

function App() {
  const [textToggle, textToggleState] = useState(true)
  return (
    <div className="App">
       <div className="Tog">
       <button className='btnHead' onClick={ () => textToggleState(!textToggle) }>Upload or Capture</button>
       </div>
       {
 textToggle ?
 <Form />

 :
 <div class="Cam"><Profile /> </div>
}
    
    
    </div>
  );
}

export default App;
