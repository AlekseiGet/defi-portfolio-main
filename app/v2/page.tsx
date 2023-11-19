"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { PrivateKeyAccount } from "viem";
import ImportWalletsDialog from '@/components/controls/importwalletsdialog'
import PortfolioManager from '@/components/controls/portfoliomanager'
import Acquaintance from "@/components/controls/Acquaintance";
import cl from "../../css/Style.module.css"

export type GlobalContent = {
  lightTheme: boolean
  cristalTheme: boolean
  hints: boolean 
 
}
export const HistoryUser = createContext<GlobalContent>({
  lightTheme: false,
  cristalTheme: true,
  hints: false
 
})
export const useGlobalContext = () => useContext(HistoryUser)

export default function V2() {
    const [wallets, setWallets] = useState<PrivateKeyAccount[]>([]); 
    const [acquaintance, setAcquaintance] = useState(false)
    const [hints ,setHints ] = useState(false)
    const [cristalTheme ,setCristalTheme ] = useState(true)
    const [lightTheme ,setLightTheme ] = useState(false)
    const [userHistory , setUserHistiory ]= useState<any[]>([{}]) 
   
    return (
      <HistoryUser.Provider 
         value={{lightTheme, cristalTheme, hints}}
      >
        <main className="flex min-h-screen flex-col overflow-hidden relative">
          <div style={{display: acquaintance? "none" : 'block' }} >
              <div className={ cl.acquaintance_conteiner } style={{backgroundImage: cristalTheme? "var(--primary-cristal)":  "var(--primary-light)"}}>
                  <div className="flex items-center justify-center min-h-screen">
                  </div>
              </div>
           </div>
           <Acquaintance acquaintance={acquaintance}  hints={hints} cristalTheme={cristalTheme} lightTheme={lightTheme} setAcquaintance={setAcquaintance} setLightTheme={setLightTheme} setCristalTheme={setCristalTheme} setHints={setHints} />                   
            {acquaintance
              ?wallets.length === 0 
                ? (<ImportWalletsDialog setWallets={setWallets} />)
                : (<PortfolioManager wallets={wallets} setWallets={setWallets} />)
              : <></>   
             }        
        </main>
      </HistoryUser.Provider>  
    )
}
