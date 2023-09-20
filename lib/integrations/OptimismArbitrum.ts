import { PrivateKeyAccount, createWalletClient, http, parseAbi, parseEther } from "viem";
import { MAINNET_OVERRIDE_URL, arbitrumProvider } from "../providers";
import { IntegrationInfo, UiContext } from "../types"
import { getTimestampOffset } from "../utils";
import { optimism } from "viem/chains";
import { createPublicClient } from "viem";

const OptimismArbitrum: IntegrationInfo<"Transfer"> =  {
    name: "OP Mainnet", 
    metrics: ["OptimismEthBalance", "ArbitrumEthBalance"],
    widget: "Transfer",
    widgetArgs: ["OptimismEth to Arbitrum Era", "Не работает"],
    handler: ArbitrumZkSyncEraHandler,
};

async function ArbitrumZkSyncEraHandler(account: PrivateKeyAccount, amount: string, context: UiContext) {

}

export default OptimismArbitrum;