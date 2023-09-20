import { PrivateKeyAccount, createWalletClient, http, parseAbi, parseEther } from "viem";
import { IntegrationInfo, UiContext } from "../types"
import { zkSync} from "viem/chains";
import { createPublicClient } from "viem";

const zkSyncToarbitrum : IntegrationInfo<"Transfer"> = {
    name: "ZkSyncEth",
    metrics: ["ZkSyncEthBalance", "ArbitrumEthBalance" ],
    widget: "Transfer",
    widgetArgs: ["ZkSync Era to ArbitrumEth", "Orbiter.Finance"],
    handler: ZkSyncArbitrumEraHandler,
};

async function ZkSyncArbitrumEraHandler(account: PrivateKeyAccount, amount: string, context: UiContext) {
      const zkSyncOrbiter = "0xee73323912a4e3772b74ed0ca1595a152b0ef282";
  const ending = 9002n;

  let amountToSendParsed = 0n;

  let gasRequirements, gasPrice;

  if (amount === "MAX") {
    const publicClient = createPublicClient({
      chain: zkSync,
      transport: http(),
    })
    const balance = (await publicClient.getBalance({ address: account.address }));
    gasRequirements = await publicClient.estimateGas({
      account: account,
      value: balance,
      to: zkSyncOrbiter,
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
    chain: zkSync,
    transport: http(),
  })

  return await wc.sendTransaction({
    account: account,
    value: amountToSendParsed,
    to: zkSyncOrbiter,

    gas: gasRequirements,
    maxPriorityFeePerGas: 0n,
    maxFeePerGas: gasPrice,
  })
}

export default zkSyncToarbitrum;