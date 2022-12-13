import { ethers } from 'ethers';
import { useState } from 'react';
import Ledger from './Ledger.json'



const contractAddress = '0x15757D862992cf0AA30484Dd83f4b2Cbb6e039A7'
const abi = Ledger.abi;



function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [buyerPan, setBuyerPan] = useState("");
  const [result , setResult] = useState([]);

  const connectWallet =async()=>{
    const {ethereum} = window;
    console.log(ethereum);
    if(ethereum){
      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log(accounts[0]);
    }
    else{
      console.log('ethereum doesnt exist');
    }
  
  }
  
  const handleClick = async()=>{
    const {ethereum} = window;
    if(!ethereum)
    {
      console.log('ethereum doesnt exist');
      return;
    }
  
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const ledger = new ethers.Contract(contractAddress,abi,signer);
    
    const txn = await ledger.returnInvoices(buyerPan);
    setResult(txn);
    console.log(txn);
  }

  return (

  <div>
    <h1>Ledger Address on goerli: {contractAddress}</h1>
    <div>Some Buyer Pan are: BY123 , BY332</div>
    <input id="buyerPan" value={buyerPan} onInput={e => setBuyerPan(e.target.value)}/>

    <button id="submit" onClick={handleClick}>Submit</button>
    <button id="connect" onClick={connectWallet}>Connect Wallet</button>

    <div id="walletID">{currentAccount}</div>
    <div>Invoice address for this Buyer Pan are:</div>
    <div id="Output">{ result.map((e,idx)=>{return <div key={idx}>{e}</div>})} </div>

    <div>Can verify on: https://goerli.etherscan.io/address/put_the_address_here</div>
  </div>


  );
}

export default App;
