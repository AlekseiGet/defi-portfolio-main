import { useState, useCallback, useEffect, useContext  } from "react";
import { Button } from "@/components/ui/button"
import Timer from "../ui/Timer";
import { useGlobalContext } from "./walletcard";

export default function SimpleAction({ name, subname, action, messageActions, delayedStart, backSum }: { name: string, subname: string | undefined, action: () => void, messageActions: string, delayedStart: boolean, backSum: (newState: string) => void }) {
    const [styleActive, setStyleActive ] =useState("none")
    const [value, setValue] = useState("");
    const [startTimer, setStartTimer] = useState(false)
    const {userHistory , setUserHistiory } = useGlobalContext()

 //   const userHistory = useContext(HistoryUser)

    useEffect(()=>{
         messageActions == name 
         ? setStyleActive("flex")
         :setStyleActive("none")
             
       } ,[messageActions]);

       useEffect(()=>{
         if (delayedStart && messageActions === name) {  // Передать сюда состояние
           // console.log('run' +'; '+ delayedStart +'; '+ messageActions +'; '+ name);
            ()=> action()
            setStartTimer(!startTimer)
            setUserHistiory([ ...userHistory ,{value:'...?', name:name, subname:subname, now:new Date().toLocaleTimeString(), status: "false"}]);  
         }
       } ,[delayedStart])

       useEffect(()=>{
         backSum ('...')
       } ,[value]);
       



    return (
        <div>
           <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } }  >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            
          </div>
          
        </div>
        
    )
}