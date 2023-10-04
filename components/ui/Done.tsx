import React from 'react';

const Done = (props: {value: string , name: string, subname: string  | undefined, now: string  | undefined}) => {
    console.log(props.value);
    console.log(props.name);
    console.log(props.subname);
    console.log(props.now);

    //  console.log("The time is: \n"+now);
    
    return (
        <div>
            
        </div>
    );
};

export default Done;