import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Admin from './Admin';
import User from './User';
import { useState } from 'react';
import '../App.css';
const Main=()=>{
    const [currentLocation,setCurrentLocation]=useState("Admin");
    return(
        <div className="fluid-container">
            <div className="row top-container">
            <div className="col-sm-2 col-md-6">
                <button className="btn btn-secondary main-button">VC</button>
            </div>
            <div className="col-sm-10 col-md-6 mt-3 horizontal-list ">
            <ul>
                <li ><button  className={currentLocation==="Admin"?"bg-secondary text-white":"bg-dark text-white"} onClick={()=>setCurrentLocation("Admin")} value="Admin">Admin</button></li>
                <li ><button className={currentLocation==="User"?"bg-secondary text-white":"bg-dark text-white"} onClick={()=>setCurrentLocation("User")} > User</button></li>
            </ul>
            </div>
           

        </div>
        {currentLocation==="Admin" && <Admin/>}
        {currentLocation==="User" && <User/>}
        </div>
    )
}
export default Main;