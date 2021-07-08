import React from 'react';

type Props = {
    onClick: () => void;
}

const TimerButtonClear: React.FunctionComponent<Props> = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick}>Очистить</button>
    )
};

export default TimerButtonClear;
