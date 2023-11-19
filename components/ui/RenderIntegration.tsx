import { CollectedMetrics, IntegrationInfo, MetricsToDisplay, TxInfo, UiContext } from "@/lib/types";
import { PrivateKeyAccount } from "viem";
import TransferAction from "../controls/transferaction";
import SimpleAction from "../controls/simpleaction";
import { useState} from "react";
import cl from "../../css/Style.module.css"

import EigenLayer from "@/lib/integrations/eigenlayer";
import LibertasOmnibusZkSyncEra from "@/lib/integrations/libertasOmnibusZkSyncEra";
import { MuteIoZkSyncEthToUSDC } from "@/lib/integrations/muteio";
import ArbitrumZkSyncEra from "@/lib/integrations/arbitrumToZkSync";
import zkSyncToarbitrum from "@/lib/integrations/zkSyncToarbitrum";
import OptimismArbitrum from "@/lib/integrations/OptimismArbitrum";

function renderIntegration(integration: IntegrationInfo<any>, index: number, wallet: PrivateKeyAccount, context: UiContext, messageActions : string, delayedStart: boolean, backSum: (newState: string) => void, keys: number ) {
   
    if (integration.widget === "Transfer") {
        const ti = integration as IntegrationInfo<"Transfer">;
        return (
            <TransferAction name={ti.widgetArgs[0]}
                subname={ti.widgetArgs[1]}
                action={v => ti.handler(wallet, v, context)}
                messageActions= { messageActions}
                delayedStart= {delayedStart}
                backSum = {backSum}
                keys= {keys}
            />)
    }
    if (integration.widget === "SimpleAction") {
        const ti = integration as IntegrationInfo<"SimpleAction">;
        return (
            <SimpleAction name={ti.widgetArgs[0]}
                subname={ti.widgetArgs[1]}
                action={() => ti.handler(wallet, context)}
                messageActions= { messageActions}
                delayedStart= {delayedStart}
                backSum = {backSum}
                keys= {keys}
            />)
    }
    return (<div key={index}>{integration.name} is not supported yet</div>)
}

const defaultIntegrations = [EigenLayer, LibertasOmnibusZkSyncEra, MuteIoZkSyncEthToUSDC, ArbitrumZkSyncEra, zkSyncToarbitrum, OptimismArbitrum]

export default function RenderIntegration(props: {  wallet: PrivateKeyAccount, messageActions: string, delayedStart: boolean, backSum: (newState: string) => void, keys:number }) {

    const [lastTransactions, setLastTransactions] = useState<TxInfo[]>([]);
    const [selectedIntegrations, setSelectedIntegrations] = useState<IntegrationInfo<any>[]>(defaultIntegrations);

    const context: UiContext = {
        txAdder: (txInfo: TxInfo) => setLastTransactions([txInfo, ...lastTransactions]),
    };

    return (     
              
         <div className="flex flex-col ">
            {selectedIntegrations.map((integration, index) => renderIntegration( integration, index, props.wallet, context, props.messageActions, props.delayedStart, props.backSum, props.keys))}
         </div> 
       
    )
}

