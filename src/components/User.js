import { useState } from "react";
//import ethers from 'ethers';
import '../App.css';
import {contractAddress, AbiAddress } from './constants';
const User=()=>{
    const ethers=require('ethers');
    const [beneficiaryAddress,setBeneficiaryAddress]=useState("");
    const [vestedTokenscount,setVestedTokenscount]=useState(0);
    async function releaseTokens(){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const connect=new ethers.Contract(contractAddress,AbiAddress,provider.getSigner());
        const transactionResponse = await connect.releaseTokens();
        const receipts = await transactionResponse.wait();
        //const eventOne = receipts.events.find(e => e.event === "TokensReleasedCompletely");
        //if (eventOne) {
        //const address = eventOne.args[0];
        //alert("No tokens Due to release");
        //}
        const event= receipts.events.find(e => e.event === "TokensReleased");
        if (event) {
        const address = event.args[1];
        alert("Tokens released");
        }

    }
    async function vestedTokens(){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const connect=new ethers.Contract(contractAddress,AbiAddress,provider.getSigner());
        const transactionResponse = await connect.releasableTokens(beneficiaryAddress);
        console.log(transactionResponse);
        alert(transactionResponse);
        setVestedTokenscount(transactionResponse);

    } 
    return (
        <div className="container">
        <div className="row">
            <div className="col-sm-1 col-md-3"></div>

            <div className="col-sm-10 col-md-6 mt-5 ">
                <h3>Beneficiary Details </h3>
                <div className="user-container">
                <button class="btn btn-dark mb-4" onClick={releaseTokens}>Release Tokens</button>
                
                <div className="input-group m-3">
                      <div className="input-group-prepend ">
                          <span className="input-group-text button_backgrounds" >Beneficiary Address</span>
                      </div>
                      <input placeholder="Beneficiary Address to view vested tokens" type="text" className="form-control" onChange={(event) => setBeneficiaryAddress(event.target.value)}/>
                  </div>
                  <button className="btn btn-dark mb-4" onClick={vestedTokens}>Vested Tokens</button>
                 
                </div>
                </div>
                </div>
                </div>
    )
}
export default User;
//0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
//0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// <p className={vestedTokenscount>0?"amount-display":""}>{vestedTokenscount>0?vestedTokenscount:""}</p>