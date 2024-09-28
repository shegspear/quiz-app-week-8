"use client";

import React, { useEffect, useState } from 'react';
// import {whenConnect} from "../../utils/omnitools";

const Wallet = () => {
  const [acc, setAcc] = useState("");

  // const connectMe = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //       setProvider(window.ethereum);
  //       console.log('Wa sere');
  //   }
  // }

  // const connectWallet = async() => {
  //   const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
  //   setAcc(accounts[0])
  // }

  // useEffect(() => {
  //   connectMe()
  // }, [])

  // window.ethereum.on("connect", whenConnect);

  // window.ethereum.on("disconnect", whenDisconnect);

  // window.ethereum.on("accountsChanged", accountChanged);

  // window.ethereum.on("chainChanged", whenChainChanged);

//   provider.on("connect", whenConnect);

  return (
    <div
        className='w-full h-screen flex justify-center items-center'
    >
       <div
        className='flex flex-col justify-center items-center w-8/12 border-2 rounded-xl p-4'
       >
            <button
                // onClick={connectWallet}
                className='mb-4 border-2 w-[200px] rounded-xl p-4'
            >
                Pablo wa connect
            </button>

            <p>
               Egbon ti wale :{acc}
            </p>
       </div>
    </div>
  )
}

export default Wallet