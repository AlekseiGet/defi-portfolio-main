import { privateKeyToAccount, PrivateKeyAccount } from 'viem/accounts'
import { useState } from 'react';
import cl from "../../css/Style.module.css"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Footer from '../ui/footer';


export default function ImportWalletsDialog({ setWallets }: { setWallets: ((wallets: PrivateKeyAccount[]) => void) }) {
    const [keys, setKeys] = useState("")
    const getKeys = () => {
        return (keys.match(/[0-9A-Fa-f]{64}/g) || []).map(k => privateKeyToAccount(`0x${k}`));
    };

    return (
        <div className={cl.fon_walletDialog} >
            <div className={cl.greeting}> <h1 className='text-slate-300 text-4xl text-center pt-4'>Defi Crystal</h1> </div>
             <div className="grid w-full gap-1.5 ">
               <Label className='text-slate-300' htmlFor="pk-input ">Please, enter your private keys:</Label>
              <Textarea placeholder="0x0123456789abcdef...." id="pk-input" onChange={e => setKeys(e.target.value)} />
              <div className="flex gap-1.5">
                <Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={() => setWallets(getKeys())}>OK</Button>
                <Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={
                    () => setWallets([privateKeyToAccount("0xd7403eb69ebef57aa9be59921efe29880e1e6cd300a8bbfc9323e0e6cfd4d9a2")])
                }>Demo</Button>
              </div>
              <Footer/>

             </div>
        </div>
       
    )
}