import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import cl from "../../css/Style.module.css"
import Help from '../pages/Help';


const Acquaintance = ({acquaintance, hints, cristalTheme, lightTheme, setAcquaintance, setLightTheme, setCristalTheme, setHints  }: {acquaintance: boolean, hints: boolean, cristalTheme: boolean, lightTheme: boolean, setAcquaintance: ((acquaintance: boolean) => void),setLightTheme: ((lightTheme: boolean) => void), setCristalTheme: ((cristalTheme: boolean) => void), setHints: ((hints: boolean) => void) }) => {

    const [help ,setHelp ] = useState(false)
    const [miniMenu, setMiniMenu ] = useState(false)
    useEffect(()=>{
        setMiniMenu(acquaintance)
    },[acquaintance])

    const opposite = ()=> {
        setLightTheme(!lightTheme)
        setCristalTheme(!cristalTheme)
    }



    return ( 
       <div className={cl.acquaintance}>
          <div className={miniMenu? cl.acquaintance_menu_mini :cl.acquaintance_menu} onClick={acquaintance? ()=> setMiniMenu(!miniMenu ): ()=> setMiniMenu(miniMenu ) }>
            <div className="rounded-xl  text-card-foreground shadow opacity-90 p-8 flex flex-col items-center" >
               <h1 className='pb-4 text-4xl font-bold text-primary-foreground' >{!acquaintance?' DeFi Crystal':'Меню'} </h1>
               <div>
              <div style={{display:acquaintance? 'none' : 'flex' }} >
                  <Button style={{ width: '135px' }} variant={'mystyle'} onClick={() => setAcquaintance(true)}  > Вход </Button>
               </div> 
              <div className="flex items-baseline  ">
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: '135px' }} variant={'mystyle'} onClick={() => setHints(!hints)} > Подсказки </Button></div>
              <div className={cl.indikator} style={{opacity:  hints  ?"1": "0"  }} ></div> </div> 
              <div  className="flex items-baseline  ">
                   <div onClick={(e) => e.stopPropagation()}><Button style={{ width: '135px' }} variant={'mystyle'} onClick={opposite} > Светлая тема </Button></div>
              <div className={cl.indikator} style={{opacity:  lightTheme  ?"1": "0"  }} ></div> </div> 
              <div  className="flex items-baseline ">
                   <div onClick={(e) => e.stopPropagation()}><Button style={{ width: '135px' }} variant={'mystyle'} onClick={opposite} > Тема &apos;Cristal&apos; </Button></div>
              <div className={cl.indikator} style={{opacity:  cristalTheme  ?"1": "0"  }} ></div> </div> 
              <div >
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: '135px' }} variant={'mystyle'} > <Link  href={'/ '} > Версия 1.0 </Link> </Button></div>
               </div> 
              <div >
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: '135px' }} variant={'mystyle'} onClick={()=>setHelp(!help)} > Помощь </Button></div>
             </div> 
            </div>                
            </div>               
          </div>
        {help? <Help setHelp ={setHelp } />: <div></div> } 
     </div>   
    );
};

export default Acquaintance;
