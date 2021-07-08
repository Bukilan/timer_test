import React  from 'react';

import { LogType } from '../../../types';

type Props = {
    name: LogType["name"],
    clickTime: LogType["clickTime"],
    finishTime: LogType["finishTime"],
}

const TimerLogsItem: React.FunctionComponent<Props> = ({ finishTime, name, clickTime }) => {
    return (
        <>
            {`${finishTime}: ${name} / ${clickTime}`}
        </>
    )
};

export default TimerLogsItem;
