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
       <div className={cl.acquaintance_mini}>
          <div className={miniMenu? cl.acquaintance_menu_mini :cl.acquaintance_menu} onClick={acquaintance? ()=> setMiniMenu(!miniMenu ): ()=> setMiniMenu(miniMenu ) }>
            <div className="rounded-xl border bg-card text-card-foreground shadow opacity-90 p-6 flex flex-col" >
               <h1 className='pb-4' >{!acquaintance?' Давай познакомимся !':'Меню'} </h1>
              <div style={{display:acquaintance? 'none' : 'flex' }} className="flex items-baseline justify-between ">
                  <Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={() => setAcquaintance(true)}  > Вход </Button>
               <div className={cl.indikator} ></div></div> 
              <div className="flex items-baseline justify-between ">
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={() => setHints(!hints)} > Подсказки </Button></div>
              <div className={cl.indikator} style={{backgroundColor:  hints  ?"green": "white"  }} ></div> </div> 
              <div  className="flex items-baseline justify-between ">
                   <div onClick={(e) => e.stopPropagation()}><Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={opposite} > Светлая тема </Button></div>
              <div className={cl.indikator} style={{backgroundColor:  lightTheme  ?"green": "white"  }} ></div> </div> 
              <div  className="flex items-baseline justify-between ">
                   <div onClick={(e) => e.stopPropagation()}><Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={opposite} > Тема &apos;Cristal&apos; </Button></div>
              <div className={cl.indikator} style={{backgroundColor:  cristalTheme  ?"green": "white"  }} ></div> </div> 
              <div  className="flex items-baseline justify-between ">
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: 'fit-content' }} variant={'mystyle'} > <Link  href={'/ '} > Версия 1.0 </Link> </Button></div>
              <div className={cl.indikator} style={{backgroundColor: "white" }} ></div> </div> 
              <div  className="flex items-baseline justify-between ">
                  <div onClick={(e) => e.stopPropagation()}><Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={()=>setHelp(!help)} > Помощь </Button></div>
              <div className={cl.indikator} style={{backgroundColor: "white"  }} ></div> </div>                
            </div>               
          </div>
        {help? <Help setHelp ={setHelp } />: <div></div> } 
     </div>   
    );
};

export default Acquaintance;