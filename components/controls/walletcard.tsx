import { CollectedMetrics, IntegrationInfo, MetricsToDisplay, TxInfo } from "@/lib/types";
import { PrivateKeyAccount } from "viem";
import { getEtherWithPrecison } from "@/lib/utils";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, ChangeEvent, useEffect, useMemo, useCallback, SetStateAction, useContext, createContext } from "react";
import { Rock_3D } from "next/font/google";
import cl from "../../css/Style.module.css"
import Footer from "../ui/footer";
import { Button } from "../ui/button";
import ActionList from "../ui/ActionList";
import GasItem from "../pages/GasItem";
import GasPrise from "./common/GasPrise";
import Actions from "../pages/Activities/Actions";
import Done from "../ui/Done";



function BalanceMetrics({ name, value, decimal }: { name: string, value: bigint | undefined, decimal: number | undefined }) {
    return (<>
        <div>{name}</div>
        <div>
            {value === undefined ? "..." :
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{getEtherWithPrecison(value, 3, decimal)}</TooltipTrigger>
                        <TooltipContent>
                            <p>RAW: {value.toString()}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
        </div>
    </>)
}

export type GlobalContent = {
  userHistory: any
  setUserHistiory:(c: any) => void
}
export const HistoryUser = createContext<GlobalContent>({
userHistory: {}, // set a default value
setUserHistiory: () => {},
})
export const useGlobalContext = () => useContext(HistoryUser)


export default function WalletCard( 

    { wallet, selectedIntegrations, selectedMetrics, collectedMetrics }:
        {
            wallet: PrivateKeyAccount,
            selectedIntegrations: IntegrationInfo<any>[],
            selectedMetrics: MetricsToDisplay[],
            collectedMetrics: CollectedMetrics
        }) {
     const [userHistory , setUserHistiory ]= useState<any[]>([{}])       
 
  
    return (
    <HistoryUser.Provider value={{userHistory, setUserHistiory}} >
        <div >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-amber-600">
             DeFi Portfolio
          </h1>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold  tracking-tight transition-colors first:mt-0 text-red-300">
              Wallet View
         </h2>
           
            <div className={cl.animat_greeting}>
              <Card className="opacity-90 max-w-5xl" style={{minHeight: '65vh'} }>
                <CardHeader>
                    <CardTitle>{`${wallet.address.substring(0, 6)}..${wallet.address.substring(wallet.address.length - 4)}`}</CardTitle>
                    <CardDescription>{wallet.address}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h5 className="text-base font-semibold pt-4">Balances</h5>
                    <div className="grid gap-2 grid-cols-2">
                        {selectedMetrics.includes("MainnetBalance") &&
                            (<BalanceMetrics name="Mainnet ETH" decimal={18} value={collectedMetrics.mainnetEther} />)}
                        {selectedMetrics.includes("ZkSyncEthBalance") &&
                            (<BalanceMetrics name="ZkSyncEra ETH" decimal={18} value={collectedMetrics.zksyncEraEther} />)}
                        {selectedMetrics.includes("ArbitrumEthBalance") &&
                            (<BalanceMetrics name="Arbitrum ETH"  decimal={18} value={collectedMetrics.arbitrumEraEther} />)}
                        {selectedMetrics.includes("OptimismEthBalance") &&
                            (<BalanceMetrics name="OP Mainnet"  decimal={18} value={collectedMetrics.optimismEraEther} />)}
                        {collectedMetrics.erc20Balances.map(([chain, contractAddress, label, decimal, balance]) => {
                            return (<BalanceMetrics name={`${chain.name} ${label}`} value={ balance } decimal={ decimal } key={`${chain.id}-${contractAddress}`} />)
                        })}
                    </div>
                    <GasPrise action={''} style={{}} />
                    <Actions  wallet={wallet}/>
                    <h4 className="text-center font-semibold pt-4">Actions</h4>                    
                    <Done userHistory={userHistory} />                
                </CardContent>
             </Card>
            </div>
 

        <Footer/>

        </div>   
    </HistoryUser.Provider>
    )
}