import { useState, ChangeEvent,useEffect, useCallback, useContext   } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Timer from "../ui/Timer";
import { useGlobalContext} from "../../app/v2/page";


export default function TransferAction({ name, subname, action, messageActions, delayedStart, backSum }: { name: string, subname: string | undefined, action: (value: string) => void, messageActions: string, delayedStart: boolean, backSum: (newState: string) => void }) {
    const [value, setValue] = useState("");
    const [styleActive, setStyleActive ] =useState("none")
   // const [delayedStart, setDelayedStart] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const {userHistory , setUserHistiory } = useGlobalContext()
   
       useEffect(()=>{
         messageActions == name 
         ? setStyleActive("flex")
         :setStyleActive("none")
             
       } ,[messageActions])

       useEffect(()=>{
         if (delayedStart && messageActions === name) {
          //  console.log('run' +'; '+ delayedStart +'; '+ messageActions +'; '+ name);           
            ()=> action(value)
            setStartTimer(!startTimer)  
            setUserHistiory([ ...userHistory ,{value:value, name:name, subname:subname, now:new Date().toLocaleTimeString(), status: "false"}]);            
         }
       } ,[delayedStart])

       useEffect(()=>{
         backSum (value)
       } ,[value]);

       /**
        * const run = ()=>{
          setStartTimer(!startTimer) 
          setDelayedStart(false)
       }

       const backMin = useCallback((b: boolean)=> {      
          return setDelayedStart(b);
       },[])
        */
       

       //<Timer styles={styleActive} backMin={backMin} startTimer={startTimer} setStartTimer={setStartTimer}/> 
       //<Button  disabled={value === ""} onClick={run}>{startTimer ? "Pause" : 'Run'}  </Button>
       
    return (
    <div> 
        <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } } >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            <Input className='w-24'
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
            <Button variant={'mystyle'} onClick={() => setValue("MAX")}>Max</Button>
            
        </div>
         
           
     </div>
    )
}