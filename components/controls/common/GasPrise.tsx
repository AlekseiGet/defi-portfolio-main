import GasItem from '@/components/pages/GasItem';
import { createPublicClient, http } from 'viem';
import cl from "../../../css/Style.module.css"
import { useEffect, useState } from 'react';

const base: any = []

const baseClient = (network: string)=> createPublicClient({
    chain: base,
    transport: http(network),
})

export const gas = async  (network: string)=>{  // Экспорт для кнопки, от сюда и колбэк
    const gasEstimation = await baseClient(getRpcUrlByNetwork(network)).estimateFeesPerGas()
    return gasEstimation
 }

 export const getRpcUrlByNetwork = (address: string) => {  // адреса сетей для запроса Газа
    switch (address) {
        case "arbitrum": return 'http://144.76.39.46:8160'        
        case "optimism": return 'https://opt-mainnet.g.alchemy.com/v2/NaBaRqiO5TxFC6Lh9ddChthymi3KBZw4'   
        case "eth": return 'https://eth-mainnet.g.alchemy.com/v2/gcFGCXQX2ZyfGwiF9r1fxbCwDcyD8nvJ'          
        case "zksync": return 'https://mainnet.era.zksync.io'         
        case "avax": return 'https://api.avax.network/ext/bc/C/rpc'       
        case "bsc": return 'https://bsc-dataseed3.binance.org'       
        case "harmony": return 'https://rpc.ankr.com/harmony'    
        default: throw new Error("Unknown network " + address)
    }
}

const gasList = ["arbitrum", "optimism", "eth","zksync", "avax", "bsc", "harmony"  ]  // список сетей где спрашиваю Газ "harmony"= ошибка

const GasPrise = (props:{action: string, style: {}}) => {

    const [masGas, setMasGas] = useState<any[]>([])
    const [ r, setR] = useState({ height:"200px", color: 'white'   })

    useEffect(()=>{
        props.action.length>0
        ?setMasGas([props.action ])
        :setMasGas(gasList)
    },[])

    
    return (
        <div>
            <h5 className="text-base font-semibold pt-4">GAS</h5>
            <div className={cl.gasPrice_box} >
            {masGas.map((p, index)=>
                <div key={index} style={props.style} className={cl.border}>
                   <GasItem  subName={p} />
                </div>
              )
            }
            </div>
        </div>
    );
};

export default GasPrise;





