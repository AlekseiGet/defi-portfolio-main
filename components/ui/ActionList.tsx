import React, { useCallback, useState, useEffect, useContext, createContext  } from 'react';
import ActionItem from './ActionItem';
import { PrivateKeyAccount } from 'viem';
import Done from './Done';


export const HistoryUser = createContext({});

const ActionList = (props:{ wallet: PrivateKeyAccount} ) => {
   const [userHistory , setUserHistiory ]= useState<HistoryUser>([])
   const [actions, setActions] = useState([1])
  //какой тип  ставить ? Свойство "setUserHistiory" не существует в типе "{}" вот а фак?

  type HistoryUser = [ ]
 // userHistory: any[] , setUserHistiory: ((setUserHistiory: boolean) => void)
 
   const backAction = useCallback((m: any[])=> {
    if (actions.length < 9) {
      setActions([...m])
    }
   },[actions])
   
    return (
      <HistoryUser.Provider value={{userHistory, setUserHistiory}} >
         <div className='overflow-hidden'> 
            {actions.map((index )=> 
              <ActionItem key={index} number={index } masActions={actions} backAction={backAction}  wallet= {props.wallet} />                   
             )}  
            <Done userHistory={userHistory} />             
        </div>
      </HistoryUser.Provider>
        
    );
};

export default ActionList;