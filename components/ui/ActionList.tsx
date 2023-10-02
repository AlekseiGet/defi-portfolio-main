import React, { useCallback, useState, useEffect } from 'react';
import ActionItem from './ActionItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { PrivateKeyAccount } from 'viem';


const ActionList = (props:{ wallet: PrivateKeyAccount} ) => {

   const [actions, setActions] = useState([1])

   const backAction = useCallback((m: any[])=> {
    if (actions.length < 9) {
      setActions([...m])
    }
   },[actions])

    return (
        <div className='overflow-hidden'> 
            {actions.map((index )=> 
              <ActionItem key={index} number={index } masActions={actions} backAction={backAction}  wallet= {props.wallet} />                   
             )}                  
        </div>
    );
};

export default ActionList;