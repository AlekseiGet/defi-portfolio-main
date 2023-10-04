import { useState, useCallback,useEffect  } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Timer from "../ui/Timer";

export default function SimpleAction({ name, subname, action, messageActions }: { name: string, subname: string | undefined, action: () => void, messageActions: string }) {
    const [styleActive, setStyleActive ] =useState("none")
    const [delayedStart, setDelayedStart] = useState(false)
    const [startTimer, setStartTimer] = useState(false)

    useEffect(()=>{
         messageActions == name ? 
             setStyleActive("flex"):
             setStyleActive("none")
       } ,[messageActions]);

       useEffect(()=>{
         if (delayedStart) {
            ()=> action()
            setStartTimer(!startTimer)
            alert('Поехали') 
         }
       } ,[delayedStart])

       const backMin = useCallback((b: boolean)=> {      
          return setDelayedStart(b);
       },[])

       const run = ()=>{
         setStartTimer(!startTimer)
         setDelayedStart(false)  
       }

    return (
        <div>
           <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } }  >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            <Button onClick={run}>Run</Button>
          </div>
          <Timer styles={styleActive} backMin={backMin} startTimer={startTimer}/>
        </div>
        
    )
}