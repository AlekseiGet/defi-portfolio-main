import { useState, ChangeEvent,useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Timer from "../ui/Timer";
import Done from "../ui/Done";

export default function TransferAction({ name, subname, action, messageActions }: { name: string, subname: string | undefined, action: (value: string) => void, messageActions: string }) {
    const [value, setValue] = useState("");
    const [styleActive, setStyleActive ] =useState("none")
    const [delayedStart, setDelayedStart] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const [now, setNow] = useState('')

       useEffect(()=>{
         messageActions == name ? 
             setStyleActive("flex"):
             setStyleActive("none")
       } ,[messageActions])



       useEffect(()=>{
         if (delayedStart) {
            ()=> action(value)
            alert('Поехали') 
            setStartTimer(!startTimer)  
            setNow(new Date().toLocaleTimeString())
         }
       } ,[delayedStart])

       const run = ()=>{
          setStartTimer(!startTimer) 
          setDelayedStart(false)
       }

       const backMin = useCallback((b: boolean)=> {      
          return setDelayedStart(b);
       },[])
  
       
       
       
    return (
    <div> 
        <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } } >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            <Input className='w-24'
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
            <Button variant={'mystyle'} onClick={() => setValue("MAX")}>Max</Button>
            <Button  disabled={value === ""} onClick={run}>{startTimer ? "Pause" : 'Run'}  </Button>
        </div>
        <Timer styles={styleActive} backMin={backMin} startTimer={startTimer} />
        {delayedStart? <div><Done value={value} name={name} subname={subname} now={now} /></div>: <div></div> }
         
     </div>
    )
}