import { useEffect, useState, ChangeEvent} from 'react';
import { InputAction } from './inputAction';
import type { SelectOption } from "./inputAction";
import cl from "../../css/Style.module.css"

const Timer = (props: {styles: string, backMin: (newState: boolean, n:any) => void, startTimer: boolean, setStartTimer:((startTimer: boolean) => void)} ) => {
    const [value, setValue] = useState('');
    const [indicator, setIndicator] = useState('#f5f2f2')
    const [min, setMin ] = useState(1)
    const countries = ['10 мин','20 мин','30 мин','40 мин','50 мин','60 мин','70 мин','80 мин','90 мин','100 мин'];

    useEffect(()=>{//хрень получилась
      var numEl = parseFloat(value)
      if (isNaN(numEl)) {
         setMin(1)
      } else {
         setMin(numEl)
     } 
         
    },[value])

    useEffect(()=>{
        min <=10 ? setIndicator('#ec515197'):
        setIndicator('#f5f2f2')  
        
        if (min===0) {
          setValue('Прямо сейчас')
          setMin(1)
          props.setStartTimer(false) 
          props.backMin(true, '0')
        } else { 
          props.backMin(false, min)
        }
    },[min] ) 

    if (props.startTimer) {
      if (min >=1 ) {
      setTimeout(()=>{
         setMin(min - 1)   
      },2000)}}  //пока вместо минуты 2 секунды для наглядности

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
        setValue(event.target.value);
    };

    const options: SelectOption[] = [
        { label: 'Прямо сейчас', value: '' },
        ...countries.map((country) => ({ label: country, value: country })),
       ]; 
       

    return (
      
        <div style={ {display: props.styles } }  className={cl.timer_conteiner}>
          <div className="flex flex-row gap-2 flex-wrap justify-between">
            <div className="flex flex-col">            
               <h4 className="text-amber-600 text-center"> Отложить на время</h4>
               <InputAction
                  disabled={props.startTimer}
                  options={options}
                  value={value}
                  onChange={onChange}
                />
            </div>
            <div className={cl.dial_conteiner} >
               <p style={{backgroundColor: indicator }}>Старт через: {min} мин.</p>               
            </div>
           </div>  
        </div>
   
    );
};

export default Timer;