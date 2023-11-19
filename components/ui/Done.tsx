import React, { useState } from 'react';
import {useGlobalContext } from "../../app/v2/page"
import cl from "../../css/Style.module.css"

const Done = () => {  
   const {userHistory , setUserHistiory } = useGlobalContext()
  const [hide, setHide ] = useState('0px')
  const hiden =()=> {
   hide=='0px'? setHide('240px'): setHide('0px')
  }


  return ( <div onClick={hiden} >
          {userHistory.length>1 ? 
            <div className={cl.history_conteiner} style={{transform: `translateX(${hide} )`, transition: 'all 500ms ease-in' }}>
              <h1 className='border-b border-destructive'>История</h1>
               {userHistory.map((h: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; subname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; now: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined)=>
                  <div className={cl.history_conteiner_box}  key={index} >
                     <span style={{color: 'red'}} >{h.name} </span>  
                     <span>{h.subname} </span> 
                     <span>{h.value} </span> 
                     <span>{h.now} </span> 
                     <span> {h.status} </span>            
                  </div> 
               ) }
           </div>
          : <div></div>
          }        
       </div> 
    );
};

export default Done;