import React from 'react';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Labelinput = ({ children }: Props) => {
    return (
        <div>
            return <label>{children}</label>;
        </div>
    );
};

export default Labelinput;