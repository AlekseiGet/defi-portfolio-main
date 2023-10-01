import { useState, ChangeEvent,useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TransferAction({ name, subname, action, messageActions }: { name: string, subname: string | undefined, action: (value: string) => void, messageActions: string }) {
    const [value, setValue] = useState("");
    const [styleActive, setStyleActive ] =useState("none")
  

       useEffect(()=>{
         messageActions == name ? 
             setStyleActive("flex"):
             setStyleActive("none")
       } ,[messageActions])

    
 
    //style={{ display: "none" } }
    
    return (
        <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } } >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            <Input className='w-24'
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
            <Button variant={'mystyle'} onClick={() => setValue("MAX")}>Max</Button>
            <Button  disabled={value === ""} onClick={() => action(value)}>Run</Button>
        </div>
    )
}