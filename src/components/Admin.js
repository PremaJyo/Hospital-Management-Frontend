//import ethers from 'ethers';
import { useState } from "react";
import {contractAddress, AbiAddress } from './constants';

const Admin=()=>{
    const ethers=require('ethers');

    const [beneficiaryAdded,setBeneficiaryAdded]=useState(false);
    const [beneficiaryAddress,setBeneficiaryAddress]=useState("");
    const [totalTokens,setTotalTokens]=useState(0);
    const [role,setRole]=useState("");
   
    async function addBeneficiary(){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const connect=new ethers.Contract(contractAddress,AbiAddress,provider.getSigner());
        const transactionResponse = await connect.addBeneficiary(beneficiaryAddress,totalTokens,role);
        const receipts = await transactionResponse.wait();
        const event = receipts.events.find(e => e.event === "BeneficiaryAdded");
        if (event) {
        //const startTime = event.args[0];
        alert("Beneficiary Added successfully");
        }
        setBeneficiaryAdded(true);
    }
    async function startVesting(){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        //const provider = new ethers.providers.JsonRpcProvider("http://localhost:3000/");
        const connect=new ethers.Contract(contractAddress,AbiAddress,provider.getSigner());
        //alert(connect);
        const transactionResponse = await connect.startVesting();
        const receipts = await transactionResponse.wait();
        const event = receipts.events.find(e => e.event === "VestingStarted");
        if (event) {
        const startTime = event.args[0];
        alert("Vesting Started at ",startTime);
        }
        

    }
    return (
        <div>
        <div className="container">
          <div className="row">
              <div className="col-sm-1 col-md-3"></div>
              <div className="col-sm-10 col-md-6 mt-5">
                <h3>Vesting Admin </h3>
              <div className="user-container">
                  <button class="btn btn-dark " onClick={startVesting}>Start Vesting</button>
                  
                  
                  <div className="input-group m-3">
                      <div className="input-group-prepend">
                          <span className="input-group-text">Benificiary Address</span>
                      </div>
                      <input type="text" className="form-control" placeholder="Beneficiary Address" onChange={(event) => setBeneficiaryAddress(event.target.value)}/>
                  </div>
                  <div className="input-group m-3">
                      <div className="input-group-prepend ">
                          <span className="input-group-text button_backgrounds" >Total Tokens</span>
                      </div>
                      <input placeholder="Total Tokens" type="text" className="form-control" onChange={(event) => setTotalTokens(event.target.value)}/>
                  </div>
                  <div className="input-group m-3">
                      <div className="input-group-prepend">
                          <span className="input-group-text  button_backgrounds" >Role</span>
                      </div>
                      <input placeholder="Enter joining date" type="text" className="form-control" onChange={(event) => setRole(event.target.value)}/>
                  </div>
                  
                  <button class="btn btn-dark" onClick={addBeneficiary}>Add Beneficiary</button>
                  
              </div>
              <p className="mt-4 success_message mt-2 text-success">{beneficiaryAdded?"Beneficiary Added successfully":""}</p>
              </div>
              <div className="col-sm-1 col-md-3">

              </div>
          </div>
        </div>
      </div>
    )
}
export default Admin;