import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Mydashboard from './dashboard';
import Myorder from './orderlist';
import Myproduct from './productlist';
import Newproduct from './newproduct';
import Sellerheader from './sellerheader';

const SellerModule = () => {
  return (
    <HashRouter>
      <Sellerheader/>
      <Routes>
        <Route exact path="/" element={ <Mydashboard/> } />
        <Route exact path="/productlist" element={ <Myproduct/> } />
        <Route exact path="/newproduct" element={ <Newproduct/> } />
        <Route exact path="/order" element={ <Myorder/> } />
      </Routes>
    </HashRouter>
  )
}

export default SellerModule
