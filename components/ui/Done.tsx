import React, { useState } from 'react';
import {useGlobalContext } from "../../app/v2/page"
import cl from "../../css/Style.module.css"

const Done = () => {  

  const [hide, setHide ] = useState('0px')
  const hiden =()=> {
   hide=='0px'? setHide('240px'): setHide('0px')
  }


  return ( <div onClick={hiden} >
                
       </div> 
    );
};

export default Done;