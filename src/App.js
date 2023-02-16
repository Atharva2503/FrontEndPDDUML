import React, { Component }  from 'react';
import { useState } from 'react';
import './App.css';
import Form from './Form';
import Profile from './Profile';

function App() {
  const [textToggle, textToggleState] = useState(true)
  return (
    <div class="App">
       <div class="Tog">
       <button onClick={ () => textToggleState(!textToggle) }>Upload or Capture</button>
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
