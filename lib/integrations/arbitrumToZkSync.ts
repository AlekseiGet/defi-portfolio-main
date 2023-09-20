import { PrivateKeyAccount, createWalletClient, http, parseAbi, parseEther } from "viem";
import { MAINNET_OVERRIDE_URL, arbitrumProvider } from "../providers";
import { IntegrationInfo, UiContext } from "../types"
import { getTimestampOffset } from "../utils";
import { arbitrum } from "viem/chains";
import { createPublicClient } from "viem";

const ArbitrumZkSyncEra: IntegrationInfo<"Transfer"> = {
    name: "Arbitrum Eth",
    metrics: ["ArbitrumEthBalance", "ZkSyncEthBalance"],
    widget: "Transfer",
    widgetArgs: ["ArbitrumEth to ZkSync Era", "Orbiter.Finance"],
    handler: ArbitrumZkSyncEraHandler,
}

async function ArbitrumZkSyncEraHandler(account: PrivateKeyAccount, amount: string, context: UiContext) {

  const arbitrumOrbiter = "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8";
  const ending = 9014n;

  let amountToSendParsed = 0n;

  let gasRequirements, gasPrice;

  if (amount === "MAX") {
    const publicClient = createPublicClient({
      chain: arbitrum,
      transport: http(),
    })
    const balance = (await publicClient.getBalance({ address: account.address }));
    gasRequirements = await publicClient.estimateGas({
      account: account,
      value: balance,
      to: arbitrumOrbiter,
    })
    gasPrice = await publicClient.getGasPrice() * 12n / 10n;
    console.log("Balance", balance, "GasPrice", gasPrice, "GasEstimate", gasRequirements)
    amountToSendParsed = (balance - gasPrice * gasRequirements - ending) / 10000n * 10000n + ending;
  } else {
    amountToSendParsed = parseEther(amount) / 10000n * 10000n + ending;
  }

  if (amountToSendParsed < parseEther("0.005")) {
    throw "Orbiter: too low amount"
  }

  const wc = createWalletClient({
    account: account,
    chain: arbitrum,
    transport: http(), 
  })
 console.log(gasRequirements);

  return await wc.sendTransaction({
    account: account,
    value: amountToSendParsed,
    to: arbitrumOrbiter,

    gas: gasRequirements,
    maxPriorityFeePerGas: 0n, 
    maxFeePerGas: gasPrice,
  })
}

export default ArbitrumZkSyncEra;