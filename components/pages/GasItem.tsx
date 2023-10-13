import React, { useCallback, useEffect, useState } from 'react';
import { gas} from '../controls/common/GasPrise';
import { Button } from '../ui/button';
import cl from "../../css/Style.module.css"
import MyLoader from '../ui/Loader/MyLoader';


const GasItem = (props: {subName: string}) => {
   const nameNetwork = props.subName  // имя в которой сети
    const [gasPrise, setGasPrise] = useState<any>({})
    const [price, setPrice ] = useState<any[]>([])
  
    const gasMeaning = useCallback( async ()=>{  
        const response: any = await (gas(nameNetwork))
        price.length = 0
        setGasPrise(response)
        setPrice([price]) //очистил перед записью
        for (let key in response){
            price.push(key, Number(response[key]) )  // перебрал и записал для последующего перебора, перевёл в число
            setPrice([...price])         
        }       
   },[])

   useEffect(()=>{
       gasMeaning()
   },[])

    return (
        <div>
            <h2 className="text-base font-semibold pt-2">В сети {nameNetwork}</h2>
            <div >
              {price.length
               ? price.map((index)=> 
                 <div key={index} className='pt-2'>{index==="maxPriorityFeePerGas"
                   ? " плата за приоритет": 
                   index==="maxFeePerGas"
                   ?  "максимальная плата за Газ" :
                   index                   }</div>
                )
               : <MyLoader/>
              }
            </div>
            <Button onClick={gasMeaning} > Обновить</Button>
        </div>
    );
};

export default GasItem;