import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';

const Newproduct = () => {


  let[pname, pickName]=useState("");
  let[pprice, pickPrice]=useState("");
  let[pphoto, pickPhoto]=useState("");
  let[pdetails, pickDetails]=useState("");


  //state variables for error message 

  let[nameError, updateNameError]=useState("");
  let[priceError, updatePriceError]=useState("");
  let[photoError, updatePhotoError]=useState("");
  let[detailsError, updateDetailsError]=useState("");

  const save =()=>{
    let formStatus = true;

    //for name Error
    if(pname===""){
      formStatus=false;
      updateNameError("Please Enter a valid Name for the Product", "Warning");
    }else{
      updateNameError("");
    }
    //for price Error
    if(isNaN(pprice) || pprice===""){
      formStatus=false;
      updatePriceError("Please Enter a valid Price for the Product", "Warning");
    }else{
      updatePriceError("");
    }
    //for photo Error
    if(pphoto===""){
      formStatus=false;
      updatePhotoError("Invalid Photo", "Warning");
    }else{
      updatePhotoError("");
    }
    //for details Error
    if(pdetails.length<15 || pdetails.length>100){
      formStatus=false;
      updateDetailsError("Enter Valid Details b/w 15 to 100 chars !", "Warning");
    }else{
      updateDetailsError("");
    }

    if(formStatus===true){
      let newproduct = {
        name: pname,
        price: pprice,
        photo: pphoto,
        details: pdetails,
        seller:localStorage.getItem("sellerid")
    };
      let url = "http://localhost:1234/product";
      let postdata = {
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(newproduct),
      };
      fetch(url, postdata)
      .then(response=>response.json)
      .then(pinfo=>{
        swal(pname, "Save Successfully...");
        pickName("");
        pickPrice("");
        pickPhoto("");
        pickDetails("");
      })
    }else{
      swal("Invalid Input", "Please Enter Product Details", "Warning");
    }
  };
  


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mb-4 text-center">
          <h1 className="text-primary">
            <i className="fa fa-plus"></i> Enter Product Details
          </h1>
        </div>
        <div className="col-lg-4 mb-3">
          <label> Enter Product Name </label>
          <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)} value={pname} />
          <small className="text-danger">{nameError}</small>
        </div>
        <div className="col-lg-4 mb-3">
          <label> Enter Product Price </label>
          <input type="text" className="form-control" onChange={obj=>pickPrice(obj.target.value)} value={pprice} />
          <small className="text-danger">{priceError}</small>
        </div>
        <div className="col-lg-4 mb-3">
          <label> Enter Product Photo </label>
          <input type="text" className="form-control" onChange={obj=>pickPhoto(obj.target.value)} value={pphoto} />
          <small className="text-danger">{photoError}</small>
        </div>
        <div className="col-lg-9 mb-3">
          <label> Enter Product Details </label>
          <textarea className="form-control" onChange={obj=>pickDetails(obj.target.value)} value={pdetails}></textarea>
          <small className="text-danger">{detailsError}</small>
        </div>
        <div className="col-lg-3 mb-3 text-center">
          <br />
          <button className="btn btn-danger" onClick={save}> Save Product </button>
        </div>
      </div>
    </div>
  )
}

export default Newproduct
