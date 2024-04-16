import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import UserHeader from './userheader';
import Myhome from './shopping';
import Mylogin from './login';
import Myregister from './register';
import Mycart from './cart';


const UserModule = () => {
  return (
    <div>
      <HashRouter>
        <UserHeader/>
        <Routes>
          <Route exact path="/" element={<Myhome/>}/>
          <Route exact path="/cart" element={<Mycart/>}/>
          <Route exact path="/login" element={<Mylogin/>}/>
          <Route exact path="/register" element={<Myregister/>}/>
          
        </Routes>
      </HashRouter>
    </div>
  )
}

export default UserModule;
