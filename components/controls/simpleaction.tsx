import { useState, ChangeEvent,useEffect  } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SimpleAction({ name, subname, action, messageActions }: { name: string, subname: string | undefined, action: () => void, messageActions: string }) {
    const [styleActive, setStyleActive ] =useState("none")
    console.log(name);
    

    useEffect(()=>{
         messageActions == name ? 
             setStyleActive("flex"):
             setStyleActive("none")
       } ,[messageActions])

    return (
        <div className="flex flex-wrap items-baseline gap-1.5 p-6 bg-destructive rounded-xl" style={ {display: styleActive } }  >
            <a className="grow">{name} {subname && (<span className="text-xs text-neutral-400">{subname}</span>)}</a>
            <Button onClick={() => action()}>Run</Button>
        </div>
    )
}