import React, { useState, useCallback, ChangeEvent } from 'react';
import { PrivateKeyAccount } from 'viem';
import cl from './Actions.module.css'
import Timer from '@/components/ui/Timer';
import GasPrise from '@/components/controls/common/GasPrise';
import { InputAction, type SelectOption } from "../../ui/inputAction";
import ActionItem from '@/components/ui/ActionItem';
import RenderIntegration from '@/components/ui/RenderIntegration';
import { Button } from '@/components/ui/button';

const Actions = (props:{ wallet: PrivateKeyAccount} ) => {

     const countries = ['ZkSync ETH -> USDC','EigenLayer', 'Libertas Omnibus', "ArbitrumEth to ZkSync Era", "ZkSync Era to ArbitrumEth", 'OptimismEth to Arbitrum Era' ];

    const [delayedStart, setDelayedStart] = useState(false) //  дошол таймер до 0
    const [startTimer, setStartTimer] = useState(false) //запуск таймера
    const [action, setAction] = useState("optimism") // в какой сети опрашивать Газ
    const [watch, setWatch] = useState(0) // часы для отсчёта
    const [value, setValue] = useState('___'); // для инпута
    const [sum, setSum] = useState('___') //сумма

    //Вкладки открыты или нет
    const [newActions, setNewActions] = useState(false)
    const [timer, setTimer] = useState(false)
    const [gasLimit, setGasLimit] = useState(false)
    const [simple, setSimple] = useState(false) 
    const [info, setInfo] = useState(false)
 

       const backMin = useCallback((b: boolean, n: any  )=> { // Timer запускается каждый раз заново
          setWatch(n)          
          return setDelayedStart(b);
       },[])

       const backSum = useCallback((b: string )=> { // Timer запускается каждый раз заново        
          return setSum(b);
       },[])

        const options: SelectOption[] = [
        { label: 'Select...', value: 'Select...' },
        ...countries.map((country) => ({ label: country, value: country })),
       ]; 

       const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
             setValue(event.target.value);
       };
       const run = ()=>{
         setStartTimer(!startTimer) 
         setDelayedStart(false)   
       }

 

    return (
        <div className={cl.action_conteiner} >
            <div className={cl.action_conteiner_context}>
                
                <div className={cl.action_conteiner_parent}>
                        <div onClick={()=> setTimer(!timer)} className={ timer?cl.choose_dependence_timer:cl.action_conteiner_timer}>
                             <div className={cl.action_title_timer}>
                                Timer
                             </div>
                             <div onClick={(e) => e.stopPropagation()}>
                                {timer 
                                  ?<Timer styles={'flex'} backMin={backMin} startTimer={startTimer} setStartTimer={setStartTimer} />
                                  : <Timer styles={'none'} backMin={backMin} startTimer={startTimer} setStartTimer={setStartTimer} />
                                }
                                
                             </div>                            
                         </div>

                        <div onClick={()=> setGasLimit(!gasLimit)} className={ gasLimit?cl.choose_dependence_limit:cl.action_conteiner_limit}>
                            <div className={cl.action_title_limit}>
                                Gas limit
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                                {gasLimit 
                                  ? <GasPrise action={action} style={{height:"200px", color: 'white'  }}/>
                                  : <p></p>
                                }                               
                             </div> 
                        </div>
                        
                        <div onClick={()=> setSimple(!simple)} className={ simple?cl.choose_dependence_select:cl.action_conteiner_select}>
                            <div className={cl.action_title_select}>
                                Select Actions
                            </div>
                            <div style={{display: simple? 'block': 'none' }} onClick={(e) => e.stopPropagation()}>                          
                                <InputAction
                                   options={options}
                                   value={value}
                                   onChange={onChange}
                                />
                                 <RenderIntegration wallet={props.wallet} messageActions={value} delayedStart={delayedStart} backSum={backSum} />                               
                             </div>
                        </div>
                        
                        <div onClick={()=> setInfo(!info)} className={ info?cl.choose_dependence_info:cl.action_conteiner_info}>
                            <div className={cl.action_title_info}>
                                Info
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                                {info 
                                  ? <div style={{color: "white" }} > 
                                       <h1>Выбрано действие : {value}</h1>
                                       <h2>Сумма перевода : {sum} </h2>
                                       <h2>Задержка старта : {watch} min</h2> 
                                       <h2>Лимит Gas:___ </h2>
                                       <h2>Статус:___ </h2>
                                     </div>
                                  : <p></p>
                                }                               
                             </div> 
                        </div>                       
                </div>
                <div className={cl.action_conteiner_rotateLeft}>
                    <div className={cl.action_conteiner_buttom}>
                        <div  onClick={run} className={cl.action_rotateLeft_buttom}>
                            {startTimer ? "Stop" : 'Start'}
                            <h1 className={cl.action_rotateLeft_buttom_watch} >{watch > 1? watch : ""}</h1>
                       </div>                   
                    </div>
                </div>               
            </div>
            <div >New Actions</div>
        </div>
    );
};

export default Actions;