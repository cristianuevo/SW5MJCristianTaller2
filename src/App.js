import React from 'react';
import './css/main.css';
import { Routes, Route } from 'react-router'; 

import firebase,{FirebaseContext} from './firebase';

import Navbar from './ui/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Users from './components/Users';
import Class from './components/Class';
import Daily from './components/Daily';

function App() {
  return (
    <FirebaseContext.Provider
    
    value={{ firebase }}>
      <div >
      <div style={{backgroundColor:' #000300'}}><Navbar /> </div>
         
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/class' element={<Class/>}/>
            <Route path='/daily' element={<Daily/>}/>
          </Routes>
      </div>
    </FirebaseContext.Provider>
   
  );
}

export default App;
