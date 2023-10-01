import React, { useCallback, useState, useEffect } from 'react';
import ActionItem from './ActionItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { PrivateKeyAccount } from 'viem';
import cl from "../../css/Style.module.css"

const ActionList = (props:{ wallet: PrivateKeyAccount} ) => {

   const [actions, setActions] = useState([1])

   const backAction = useCallback((m: any[])=> {
    if (actions.length < 9) {
      setActions([...m])
    }
   },[actions])


    return (
        <div className='overflow-hidden'> 
          <TransitionGroup>
            {actions.map((index )=> 
            <CSSTransition
               key={index}
               timeout={500}
               classNames="disassemble" >
              <ActionItem  number={index } masActions={actions} backAction={backAction}  wallet= {props.wallet} />
            </CSSTransition>           
             )}
          </TransitionGroup>     
                    
        </div>
    );
};

export default ActionList;