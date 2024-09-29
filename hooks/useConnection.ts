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
    const [connected, setConnected] = useState(false)
    const [ethReady, setEthReady] = useState(false)
    const [ethBalance, setEthBalance] = useState(0)
    const [chainChanged, setChainChange] = useState(false)
    const [currentChain, setCurrentChain] = useState(0)


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
        console.log('account ', account)
        if(typeof window.ethereum !== "undefined") {
            try {
                const balance:any = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [account]
                })
                setEthBalance(parseInt(balance, 18))
                console.log("my eth balance ", parseInt(balance, 18))
            } catch (error) {
                setErrors(error)
            }
        }
    }

    const whenConnect = async() => {
        if(typeof window.ethereum !== "undefined") {
            setConnected(true)
        }
    }

    const connectCleanUp = (accounts:any) => {
        console.log("connect event clean up ", accounts);
    };

    const whenChainChange = (chain:any) => {
        console.log("Chain changed ", chain)
        setCurrentChain(chain)
        setChainChange(true)
    }

    const whenDisconnect = () => {
        setConnected(false)
        setAccounts([])
        setEthBalance(0)
        setChainId("")
        setCurrentChain(0)
        console.log('disconnect event clean up')
    }

    const whenChainChangeCleanup = () => {
        console.log("chain change event clean up")
    }

    useEffect(() => {
        if(typeof window.ethereum !== "undefined") {
            console.log("window ethereum is up")
            setEthReady(true);
            window.ethereum.on("connect", whenConnect)
            window.ethereum.on("chainChanged", whenChainChange)
        }

        // window.ethereum.on("disconnect", whenDisconnect)

        return() => {
            if(typeof window.ethereum !== "undefined") {
                window.ethereum.removeListener("connect", whenConnect)
                window.ethereum.removeListener("chainChanged", whenChainChange)
                window.ethereum.removeListener("disconnect", whenDisconnect)
            }
        }
    }, [accounts, chainChanged])


    return{
        accounts,
        chainId,
        errors,
        connectWallet,
        getChainId,
        connected,
        ethReady,
        ethBalance,
        getBalance,
        chainChanged,
        currentChain
    }
}