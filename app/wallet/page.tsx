"use client";

import {useConnection} from "../../hooks/useConnection";

const Wallet = () => {
  const {        
    accounts,
    connectWallet,
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
               Egbon ti wale :{accounts[0]}
            </p>
       </div>
    </div>
  )
}

export default Wallet