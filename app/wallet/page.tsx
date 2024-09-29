"use client";

import {useConnection} from "../../hooks/useConnection";

const Wallet = () => {
  const {        
    accounts,
    connectWallet,
    connected,
    getBalance,
    ethBalance,
    chainId,
    getChainId,
    chainChanged,
    currentChain,
    errors
  } = useConnection();

  return (
    <div
        className='w-full h-screen flex justify-center items-center'
    >
       <div
        className='flex flex-col justify-center items-center w-8/12 border-2 rounded-xl p-4'
       >
            <button
                onClick={connectWallet}
                className='mb-2 border-2 w-[200px] rounded-xl p-4'
            >
                Pablo wa connect
            </button>

            <p
            className="mb-2 font-semibold text-center"
            >
              Are we connected {connected ? "Yes" : "No"}
            </p>

            <p 
              className="mb-4 font-semibold text-center"
            >
               Egbon ti wole :{accounts[0]}
            </p>

            <input 
              className="mb-4 outline-none bg-transparent border-2 p-2 rounded-xl"
              type="text"
              placeholder="address"
              onChange={(e) => getBalance(e.target.value)}
            />

            <p
            className="mb-4 font-semibold text-center"
            >
              YOur eth balance: {ethBalance}
            </p>

           <div
            className="mb-4  flex flex-row items-center justify-center w-full"
           >
              <p
                className="mr-4 font-semibold text-center"
              >
                YOur chain ID: {chainId}
              </p>

              <button
                onClick={getChainId}
                className="border-2 p-2 rounded-xl border-slate-500"
              >
                Get chain ID
              </button>
           </div>

           <div
            className="flex flex-row items-center justify-center w-full"
           >
              <p
                className="font-semibold text-center"
              >
                Changed chain {chainChanged ? "Yes" : "No"}, current chain {currentChain}
              </p>
           </div>

           {
            errors && (
              <p className="text-red-500 font-bold text-sm">
                {errors.message}
              </p>
            )
           }
       </div>
    </div>
  )
}

export default Wallet