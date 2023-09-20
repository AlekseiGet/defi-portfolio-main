import { CollectedMetrics, IntegrationInfo, MetricsToDisplay, TxInfo, UiContext } from "@/lib/types";
import { PrivateKeyAccount } from "viem";
import { getEtherWithPrecison } from "@/lib/utils";
import TransferAction from "./transferaction";
import SimpleAction from "./simpleaction";
import {InputAction} from "../ui/inputAction";
import type { SelectOption } from "../ui/inputAction";

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
import { useState, ChangeEvent, useEffect} from "react";
import { Rock_3D } from "next/font/google";
import cl from "../../css/Style.module.css"
import Footer from "../ui/footer";


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

function renderIntegration(integration: IntegrationInfo<any>, index: number, wallet: PrivateKeyAccount, context: UiContext, messageActions : string ) {
    if (integration.widget === "Transfer") {
        const ti = integration as IntegrationInfo<"Transfer">;
        return (
            <TransferAction name={ti.widgetArgs[0]}
                subname={ti.widgetArgs[1]}
                action={v => ti.handler(wallet, v, context)}
                messageActions= { messageActions}
            />)
    }
    if (integration.widget === "SimpleAction") {
        const ti = integration as IntegrationInfo<"SimpleAction">;
        return (
            <SimpleAction name={ti.widgetArgs[0]}
                subname={ti.widgetArgs[1]}
                action={() => ti.handler(wallet, context)}
                messageActions= { messageActions}
            />)
    }
    return (<div key={index}>{integration.name} is not supported yet</div>)
}

const countries = ['EigenLayer', 'ZkSync ETH', 'ZkSync USDC', 'ArbitrumEth', 'OptimismEth', ' Libertas Omnibus'];

export default function WalletCard(

    { wallet, selectedIntegrations, selectedMetrics, collectedMetrics }:
        {
            wallet: PrivateKeyAccount,
            selectedIntegrations: IntegrationInfo<any>[],
            selectedMetrics: MetricsToDisplay[],
            collectedMetrics: CollectedMetrics
        }) {

     const options: SelectOption[] = [
        { label: 'Select...', value: '' },
        ...countries.map((country) => ({ label: country, value: country })),
       ];
   const [value, setValue] = useState('');
   const [valueTo, setValueTo] = useState('');
   const [messageActions, setMessageActions] = useState('Выбери что делаем');

   useEffect(()=>{
      value === "EigenLayer" && valueTo === "EigenLayer" ? setMessageActions("EigenLayer"):
      !value && !valueTo ?  setMessageActions("Выбери что делаем") :
      value && !valueTo ?  setMessageActions("Выбери куда") :
      valueTo && !value ? setMessageActions("Выбери откуда") :
      value === valueTo && value ? setMessageActions("Нет смысла"):
      value === "ZkSync ETH" && valueTo === "ZkSync USDC" ? setMessageActions("ZkSync ETH -> USDC"):
      value === "Libertas Omnibus" && valueTo === "ZkSync ETH" ? setMessageActions("Libertas Omnibus"):
      value === "ArbitrumEth" && valueTo === "ZkSync ETH" ? setMessageActions("ArbitrumEth to ZkSync Era"):
      value === "ZkSync ETH" && valueTo === "ArbitrumEth" ? setMessageActions("ZkSync Era to ArbitrumEth"):
      value === "OptimismEth" && valueTo === "ArbitrumEth" ? setMessageActions("OptimismEth to Arbitrum Era"):
      setMessageActions("Такого мы  ещё не делаем")
   } ,[value, valueTo])
   

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
    setValue(event.target.value);
  };
    const onChangeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setValueTo(event.target.value);
  };

    const [lastTransactions, setLastTransactions] = useState<TxInfo[]>([]);

    const context: UiContext = {
        txAdder: (txInfo: TxInfo) => setLastTransactions([txInfo, ...lastTransactions]),
    };


    return (
        <div className={cl.fon_walletcard} >
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

                    <h4 className="text-center font-semibold pt-4">Actions</h4>
                    <div className="border bg-primary rounded-xl grid gap-2 grid-cols-2" >
                      <h5 className="text-amber-600 text-center" >Откуда</h5>
                      <h5 className="text-amber-600 text-center"> куда </h5>
                      <InputAction
                         options={options}
                         value={value}
                         onChange={onChange}
                     />
                    
      
                       <InputAction
                         options={options}
                         value={valueTo}
                         onChange={onChangeTo}
                     />                 
                   </div>
                 <div className="border h-10 bg-primary rounded-xl text-amber-600 text-center">
                    <h4>{messageActions}</h4>
                 </div>

    
                    
                    <div className="flex flex-col gap-2 ">
                        {selectedIntegrations.map((integration, index) => renderIntegration( integration, index, wallet, context, messageActions))}
                    </div>
                </CardContent>
             </Card>
            </div>


        <Footer/>

        </div>   
       
    )
}