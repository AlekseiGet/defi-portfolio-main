import React, { useCallback, useState, useEffect, useContext, createContext  } from 'react';
import ActionItem from './ActionItem';
import { PrivateKeyAccount } from 'viem';
import Done from './Done';

export type GlobalContent = {
  userHistory: any
  setUserHistiory:(c: any) => void
}
export const HistoryUser = createContext<GlobalContent>({
userHistory: {}, // set a default value
setUserHistiory: () => {},
})
export const useGlobalContext = () => useContext(HistoryUser)


const ActionList = (props:{ wallet: PrivateKeyAccount} ) => {
  const [userHistory , setUserHistiory ]= useState<any[]>([{}])
  const [actions, setActions] = useState([1])
 
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