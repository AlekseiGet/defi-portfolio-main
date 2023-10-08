import React, { useState } from 'react';

import cl from "../../css/Style.module.css"

const Done = (props: { userHistory: { name: string | number | boolean | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; subname: string | number | boolean | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; value: string | number | boolean | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; now: string | number | boolean | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; status: string | number | boolean | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }[]; }) => {  
  const [hide, setHide ] = useState('0px')
  const hiden =()=> {
   hide=='0px'? setHide('360px'): setHide('0px')
  }


  return ( <div onClick={hiden} >
          {props.userHistory.length>1 ? 
            <div className={cl.history_conteiner} style={{transform: `translateX(${hide} )`, transition: 'all 500ms ease-in' }}>
              <h1 className='border-b border-destructive'>История</h1>
               {props.userHistory.map((h: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; subname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; now: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined)=>
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