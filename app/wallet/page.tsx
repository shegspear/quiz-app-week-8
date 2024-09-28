"use client";

import {useConnection} from "../../hooks/useConnection";

const Wallet = () => {
  const {        
    accounts,
    connectWallet,
    isConnected,
    getBalance,
    ethBalance
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
                className='mb-4 border-2 w-[200px] rounded-xl p-4'
            >
                Pablo wa connect
            </button>

            <p>
              Are we connected {isConnected}
            </p>

            <p 
              className="mb-4 font-semibold"
            >
               Egbon ti wale :{accounts[0]}
            </p>

            <input 
              className="mb-2 outline-none bg-transparent border-2 p-2 rounded-xl"
              type="text"
              placeholder="address"
              onChange={(e) => getBalance(e.target.value)}
            />

            <p>
              YOur eth balance: {ethBalance}
            </p>
       </div>
    </div>
  )
}

export default Wallet