import { useEffect, useState } from "react";

declare global {
    interface Window {
      ethereum?:{
        request: (args: {
            method: string;
            params?: unknown[];
        }) => Promise<unknown>;
        on: (eventName: string, handler: (arr: string[]) => void) => void;
        removeListener: (eventName: string, handler: (arr: string[]) => void) => void;
        isConnected: () => boolean;
    } | undefined
  }
}

export function useConnection() {
    const [accounts, setAccounts] = useState([])
    const [chainId, setChainId] = useState("")
    const [errors, setErrors] = useState<any>({
        message: "",
        code: 0,
        data: null
    })
    const [isConnected, setIsConnected] = useState(false)
    const [ethReady, setEthReady] = useState(false)
    const [ethBalance, setEthBalance] = useState(0)


    const connectWallet = async() => {
        if(typeof window.ethereum !== "undefined") {
            try {
                const accounts:any = await window.ethereum?.request({method: "eth_requestAccounts"})
                setAccounts(accounts)
            } catch (error) {
                setErrors(error)
            }
        }
    }

    const getChainId = async() => {
        if(typeof window.ethereum !== "undefined") {
            try {
                const chainId:any = await window.ethereum?.request({method: "eth_chainId"});
                setChainId(chainId)
            } catch (error) {
                setErrors(error)
            }
        } 
    }

    const getBalance = async(account:any) => {
        if(typeof window.ethereum !== "undefined") {
            try {
                const balance:any = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [account]
                })
                setEthBalance(parseInt(balance, 18))
            } catch (error) {
                setErrors(error)
            }
        }
    }

    const whenConnect = async() => {
        if(typeof window.ethereum !== "undefined") {
            setIsConnected(true)
        }
    }

    const connectCleanUp = (accounts:any) => {
        console.log("connect event clean up ", accounts);
    };

    const whenDisconnect = () => {
        setIsConnected(false)
    }

    useEffect(() => {
        if(typeof window.ethereum !== "undefined") {
            window.ethereum.on("connect", whenConnect)
        }

        setEthReady(true);

        return() => {
            if(typeof window.ethereum !== "undefined") {
                window.ethereum.removeListener("connect", connectCleanUp)
            }
        }
    }, [])


    return{
        accounts,
        chainId,
        errors,
        connectWallet,
        getChainId,
        isConnected,
        ethReady,
        ethBalance,
        getBalance
    }
}