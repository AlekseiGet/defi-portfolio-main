import * as React from 'react';
import { ChangeEvent } from 'react';
import { Label } from '@radix-ui/react-label';

     type SelectOption = {
       label: string;
       value: string;
     };

     type Props = {
       value?: string;
       label?: string;
       disabled?: boolean;
       className?: string;
       options: SelectOption[];
       onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
     };

     const InputAction = ({
       value,
       label,
       disabled,
       className,
       options,
       onChange,
     }: Props) => {
     const selectBox = (
         <select
           className={className}
           disabled={disabled}
           onChange={onChange}
           value={value}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
         </select>
       );

       const result = label ? (
       <Label>
         <div >{label}</div>
         {selectBox}
       </Label>
       ) : (
         selectBox
       );

  

       return (
        <div>
          <div className="text-amber-600 text-center">{result}</div>
        </div>    
       )
     };

export { InputAction };
export type { SelectOption };