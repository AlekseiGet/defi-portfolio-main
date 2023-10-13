import { useEffect, useState, ChangeEvent} from 'react';
import { Button } from './button';
import { InputAction } from './inputAction';
import type { SelectOption } from "./inputAction";
import RenderIntegration from './RenderIntegration';
import { PrivateKeyAccount } from 'viem';
import cl from "../../css/Style.module.css"

const ActionItem = (props: { number:  number , masActions: any[], backAction:  (newState: any[]) => void,  wallet: PrivateKeyAccount}) => {
     
     const countries = ['ZkSync ETH -> USDC', 'ArbitrumEth to ZkSync Era', 'EigenLayer stETH', 'ZkSync Era to ArbitrumEth', 'OptimismEth to Arbitrum Era'];
     const countriesSimpl = [ 'Libertas Omnibus -> ZkSync ETH' ];
    

     const [messageActions, setMessageActions] = useState('Выбери действие');
     const [value, setValue] = useState('Select...');
     const [valueTo, setValueTo] = useState('Select...');
     const [disassemble, setDisassemble] = useState(cl.disassemble_enter_active)

     useEffect(()=>{
      value === "ZkSync ETH -> USDC"? setMessageActions("ZkSync ETH -> USDC"):
      value === "EigenLayer stETH"? setMessageActions("EigenLayer"):
      valueTo === "Libertas Omnibus -> ZkSync ETH" ? setMessageActions("Libertas Omnibus"):
      value === "ArbitrumEth to ZkSync Era"? setMessageActions("ArbitrumEth to ZkSync Era"):
      value === "ZkSync Era to ArbitrumEth" ? setMessageActions("ZkSync Era to ArbitrumEth"):
      value === "OptimismEth to Arbitrum Era"? setMessageActions("OptimismEth to Arbitrum Era"):
      setMessageActions("Выбери действие")
   } ,[value, valueTo]);

 
    const numLastAction = props.masActions[props.masActions.length - 1]

   const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
    setValue(event.target.value);
  };
    const onChangeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setValueTo(event.target.value);
  };

     const options: SelectOption[] = [
        { label: 'Select...', value: 'Select...' },
        ...countries.map((country) => ({ label: country, value: country })),
       ];  
       
       const optionsSimpl: SelectOption[] = [
        { label: 'Select...', value: 'Select...' },
        ...countriesSimpl.map((country) => ({ label: country, value: country })),
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
     //<RenderIntegration wallet={props.wallet} messageActions={messageActions} delayedStart={delayedStart} />   
    return (
      <div className={disassemble} >
        <div className="text-amber-600 text-center">{props.number} Action </div>
        <div className={cl.disassemble_body}>
          <div>
             <h5 className="text-amber-600 text-center py-4 " >TransferAction</h5>
             <InputAction
               disabled={value==="Select..."? false: true }
               options={options}
               value={value}
               onChange={onChange}
              />
          </div>          
          <div>
              <h5 className="text-amber-600 text-center py-4 "> SimpleAction </h5>
              <InputAction
                disabled={value==="Select..."? false: true }
                options={optionsSimpl}
                value={valueTo}
                onChange={onChangeTo}
              /> 
          </div>
          <div >
            <h4 className="text-amber-600 text-center pt-4">{messageActions}</h4>
                
          </div>         
          
          <div className=" flex justify-between" style={{minWidth:'100%'}}>      
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