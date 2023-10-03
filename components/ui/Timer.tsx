import { useEffect, useState, ChangeEvent} from 'react';
import { InputAction } from './inputAction';
import type { SelectOption } from "./inputAction";
import cl from "../../css/Style.module.css"

const Timer = (props: {styles: string}) => {
    const [value, setValue] = useState('');
    const [min, setMin ] = useState(0)
    const countries = ['1 час', '1.5 часа', '2 часа', '12.5 час', '3 часа', ' 3.5 часа'];

    useEffect(()=>{
       setMin(+y * 60)
    },[value])

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => { 
        setValue(event.target.value);
    };

    const options: SelectOption[] = [
        { label: 'Прямо сейчас', value: '' },
        ...countries.map((country) => ({ label: country, value: country })),
       ]; 
   
     var numEl = parseFloat(value)
     let y = parseInt(numEl.toString().replace(/[^\d .]/g, '')) 

     setInterval(() => {
        if (min >= 1) {
          setMin(min - 1)  
        }    
       }, 60000);   

    return (
      
        <div style={ {display: props.styles } }  className={cl.timer_conteiner}>
          <div className="flex flex-row gap-2 flex-wrap justify-between">
            <h4 className="text-amber-600 text-center"> Отложить на время</h4>
            <InputAction
               options={options}
               value={value}
               onChange={onChange}
              />

              <div className={cl.dial_conteiner}>
               Старт через: {min} мин.
              </div>
            </div>  
        </div>
   
    );
};

export default Timer;