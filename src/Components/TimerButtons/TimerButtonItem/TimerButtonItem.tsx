import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    onClick: () => void;
}

const TimerButtonItem: React.FunctionComponent<Props> = ({ children, onClick }) => {
    return (
        <button type="button" onClick={onClick}>{children}</button>
    )
};

export default TimerButtonItem;
