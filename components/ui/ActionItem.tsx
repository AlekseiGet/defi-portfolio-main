import { useEffect, useState, ChangeEvent} from 'react';
import { Button } from './button';
import { InputAction } from './inputAction';
import type { SelectOption } from "./inputAction";
import RenderIntegration from './RenderIntegration';
import { PrivateKeyAccount } from 'viem';
import Timer from './Timer';
import cl from "../../css/Style.module.css"

const ActionItem = (props: { number:  number , masActions: any[], backAction:  (newState: any[]) => void,  wallet: PrivateKeyAccount}) => {
     
    const countries = ['EigenLayer', 'ZkSync ETH', 'ZkSync USDC', 'ArbitrumEth', 'OptimismEth', ' Libertas Omnibus'];


     const [messageActions, setMessageActions] = useState('Выбери что делаем');
     const [value, setValue] = useState('');
     const [valueTo, setValueTo] = useState('');
     const [viewTimer, setViewTimer] = useState(false);
     const [disassemble, setDisassemble] = useState(cl.disassemble_enter_active)

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
   } ,[value, valueTo]);

    const numLastAction = props.masActions[props.masActions.length - 1]

   const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
    setValue(event.target.value);
  };
    const onChangeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setValueTo(event.target.value);
  };

     const options: SelectOption[] = [
        { label: 'Select...', value: '' },
        ...countries.map((country) => ({ label: country, value: country })),
       ];   
    
    const newActive = ()=> {          
       return props.backAction([...props.masActions,numLastAction + 1 ])
     }
     const delActive = ()=> {  
        setDisassemble(cl.disassemble_exit_active)
         setTimeout( ()=> {
           if (props.masActions.length > 1) {
            props.masActions.splice(props.masActions.indexOf(props.number),1) 
            return  props.backAction([...props.masActions]) 
        }
         } ,500)
                 
     }
     
    return (
      <div className={disassemble} >
        <div className="text-amber-600 text-center">{props.number} Actions </div>
        <div className="border bg-primary rounded-xl p-1 flex flex-row gap-2 flex-wrap justify-between">
          <div>
             <h5 className="text-amber-600 text-center" >Откуда</h5>
             <InputAction
               options={options}
               value={value}
               onChange={onChange}
              />
          </div>          
          <div>
              <h5 className="text-amber-600 text-center"> куда </h5>
              <InputAction
                options={options}
                value={valueTo}
                onChange={onChangeTo}
              /> 
          </div>
          <div>
            <h4 className="text-amber-600 text-center">{messageActions}</h4>
          </div>         
          <RenderIntegration wallet={props.wallet} messageActions={messageActions} />
          <div className="flex justify-between">      
            <Button style={ props.masActions.length > 1 ? { width: 'fit-content' }:{display: 'none'} } variant={'mystyle'} onClick={delActive}> 
              Удалить
            </Button>  
            <Button  style={props.number === numLastAction && props.masActions.length < 9 ? { width: 'fit-content' }:{display: 'none'} } variant={'mystyle'} onClick={newActive} >
              Добавить 
            </Button> 
          </div>                
        </div>
      </div>  
    );
};

export default ActionItem;