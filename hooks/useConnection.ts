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

    const whenConnect = async() => {
        if(typeof window.ethereum !== "undefined") {
            setIsConnected(true)
        }
    }

    const logAccounts = (accounts:any) => {
        console.log("account change event clean up ", accounts);
    };

    useEffect(() => {
        if(typeof window.ethereum !== "undefined") {
            window.ethereum.on("connect", whenConnect)
        }

        setEthReady(true);

        return() => {
            if(typeof window.ethereum !== "undefined") {
                window.ethereum.removeListener("accountsChanged", logAccounts)
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
        ethReady
    }
}