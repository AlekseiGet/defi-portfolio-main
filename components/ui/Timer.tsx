import { useEffect, useState, ChangeEvent} from 'react';
import { InputAction } from './inputAction';
import type { SelectOption } from "./inputAction";
import cl from "../../css/Style.module.css"

const Timer = (props: {styles: string}) => {
    const [value, setValue] = useState('');
    const [indicator, setIndicator] = useState('#f5f2f2')
    const [min, setMin ] = useState(0)
    const countries = ['1 час','2 часа','3 часа','4 часа','5 часов','6 часов','7 часов','8 часов','9 часов','10 часов'];

    useEffect(()=>{//хрень получилась
      var numEl = parseFloat(value)
      if (isNaN(numEl)) {
         setMin(0)
      } else {
         let y = parseInt(numEl.toString().replace(/[^\d .]/g, '')) 
         setMin(+y * 60)
     }     
    },[value])

    if (min >=1 ) {
      setTimeout(()=>{
         setMin(min - 1)
      console.log(min);
      },60000)
    }

       

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
                  options={options}
                  value={value}
                  onChange={onChange}
                />
            </div>
            <div className={cl.dial_conteiner} >
               <p>Старт через: {min} мин.</p>               
            </div>
           </div>  
        </div>
   
    );
};

export default Timer;