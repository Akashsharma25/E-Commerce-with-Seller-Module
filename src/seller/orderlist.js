import React from 'react';
import { useState, useEffect } from 'react';

const Myorder = () => {

  let[allorder, updateOrder]= useState([]);

  const getOrder = ()=>{
    let url = "http://localhost:1234/order";
    fetch(url)
    .then(response=>response.json())
    .then(orderArray=>{
      updateOrder(orderArray.reverse());
    })
  }

  useEffect(()=>{
    getOrder();
  });


  let sellerid=localStorage.getItem("sellerid");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1 className="text-primary">
            <i className="fa fa-headset"></i> Order List
          </h1>
        </div>
      </div>
      {
        allorder.map((order, index)=>{
          return (
            <div className="row mb-5 shadow p-4 rounded" key={index}>
              <div className="col-lg-3">
                <h4>{order.fullname}</h4>
                <address>
                  <p>{order.mobile}</p>
                  <p>{order.email}</p>
                  <p>{order.address}</p>
                </address>
              </div>
              <div className="col-lg-9">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Product Name </th>
                      <th> Image </th>
                      <th> Price </th>
                      <th> Qty </th>
                      <th> Total Cost </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order.itemlist.map((eachitem, index2) =>{
                        if(sellerid==eachitem.seller)
                        return (
                          <tr key={index2}>
                            <td> {eachitem.name} </td>
                            <td> <img src={eachitem.photo} width="50" height="50" alt='#' /> </td>
                            <td> {eachitem.price} </td>
                            <td> {eachitem.qty} </td>
                            <td> {eachitem.price*eachitem.qty} </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Myorder;
