import React from 'react';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const Mycart = () => {

  let[allproduct,updateProduct]=useState([]);
  let total=0;

  const getProduct = () =>{
    let url = "http://localhost:1234/cart";
    fetch(url)
    .then(response=>response.json())
    .then(productArray=>{
      updateProduct(productArray.reverse());
    })
  }

  useEffect(()=>{
    getProduct();
  })


  const delCart = (id, name) =>{
    let url = "http://localhost:1234/cart/"+id;
    let postdata = {'method': 'DELETE'}
    fetch(url, postdata)
    .then(response=>response.json())
    .then(productArray=>{
      getProduct();
      swal(name,"Deleted from your Cart", "success");
    })
  }

  const updateCart =(product, input) =>{
    if(input==="Y"){
      product["qty"] = product.qty+1;
    }else{
      product["qty"] = product.qty-1;
    }
    if(product.qty===0){
      delCart(product.id, product.name);
    }

    let url = "http://localhost:1234/cart/"+product.id;
    let postdata ={
      headers: {'Content-Type': 'application/json'},
      method:'put',
      body: JSON.stringify(product)
    }
    fetch(url, postdata)
    .then(response=>response.json())
    .then(info=>{
      getProduct();   // to relode the page
    })
  }

  let [customer,pickCustomer]=useState("");
  let [mobile,pickMobile]=useState("");
  let [email,pickEmail]=useState("");
  let [address,pickAddress]=useState("");


  const placeorder=()=>{
    let url = "http://localhost:1234/order";
    let orderdata = {
        fullname: customer,
        mobile: mobile,
        email: email,
        address: address,
        itemlist:allproduct
    };
    let postdata = {
      headers: {'Content-Type': 'application/json'},
      method:'POST',
      body: JSON.stringify(orderdata)
    }
    fetch(url, postdata)
    .then(response=>response.json())
    .then(info=>{
      swal(customer, "Thank You For the Shopping", "We have recieved your Order");

      // below code is to mpty the cart and placeorder details
      allproduct.map((p, index)=>{
        delCart(p.id, p.name);
      })
      pickCustomer("");
      pickMobile("");
      pickEmail("");
      pickAddress("");
    })
  }

  return (
    <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3">
            <div className="shadow-lg p-3">
              <h3 className="text-center"> Customer Details </h3>
              <div className="mb-3">
                <label> Customer Name </label>
                <input type="text" className="form-control" onChange={obj=>pickCustomer(obj.target.value)} value={customer} />
              </div>
              <div className="mb-3">
                <label> Customer Mobile </label>
                <input type="text" className="form-control" onChange={obj=>pickMobile(obj.target.value)} value={mobile} />
              </div>
              <div className="mb-3">
                <label> E-Mail </label>
                <input type="email" className="form-control" onChange={obj=>pickEmail(obj.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <label> Dilivery Address </label>
                <textarea className="form-control" onChange={obj=>pickAddress(obj.target.value)} value={address} style={{resize:'none'}} />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" onClick={placeorder}> Save </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <h3 className="card-text text-center">{allproduct.length} : Items in Your Cart</h3>
                <table className="table-bordered table mt-5">
                  <thead>
                    <tr>
                      <th className='text-center'> Sl. No. </th>
                      <th className='text-center'> Item Name </th>
                      <th className='text-center'> Photo </th>
                      <th className='text-center'> Price </th>
                      <th className='text-center'> Qty </th>
                      <th className='text-center'> Total </th>
                      <th className='text-center'> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allproduct.map((product, index)=>{
                      total=total+(product.price*product.qty);
                      return (
                        <tr key={index}>
                          <td className='text-center'> {index+1} </td>
                          <td> {product.name} </td>
                          <td className='text-center'> <img src={product.photo} height={50} width={50} className="img-fluid" alt='#' /> </td>
                          <td > ₹ {product.price} </td>
                          <td className="input-group">
                            <button
                            className="btn btn-sm-sm btn-secondary"
                            onClick={updateCart.bind(this, product, "N")}>-</button>
                            <input type="text" className="form-control text-center" readOnly="readonly" value={product.qty} />
                            <button
                            className="btn btn-sm-sm btn-secondary"
                            onClick={updateCart.bind(this, product, "Y")}>+</button>
                          </td>
                          <td> ₹ {product.price*product.qty} </td>
                          <td className='text-center'>
                            <button type="button" className="btn btn-outline-danger" onClick={delCart.bind(this, product.id, product.name)}>
                               <i className='fa fa-trash'></i> Remove 
                             </button>
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td colSpan={7} className='text-end text-primary'><b>₹{total} - Total Cost </b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Mycart;
