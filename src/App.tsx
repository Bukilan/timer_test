import React from 'react';

import { TimerButtonLayout, TimerButtonItem, TimerButtonClear } from "./Components/TimerButtons";
import { TimerLogsItem, TimerLogsLayout } from "./Components/TimerLogs";

import useTimer  from "./hooks/useTimer";

import { LogType } from './types';

import './App.css'


const App: React.FunctionComponent = () => {
    const { pushNewTimeout, clearTimer, logs } = useTimer()

    const handleTimerButtonClick = (timerValue: number) => {
        return () => {
            pushNewTimeout(timerValue, timerValue * 1000)
        }
    }

    const handleTimerButtonClearClick = () => {
        clearTimer()
    }

    const ClearButton = <TimerButtonClear onClick={handleTimerButtonClearClick} />

    return (
        <div className="PageLayout">
            <TimerButtonLayout clearButton={ClearButton}>
                <TimerButtonItem onClick={handleTimerButtonClick(1)}>
                    Таймер {1} сек
                </TimerButtonItem>
                <TimerButtonItem onClick={handleTimerButtonClick(2)}>
                    Таймер {2} сек
                </TimerButtonItem>
                <TimerButtonItem onClick={handleTimerButtonClick(3)}>
                    Таймер {3} сек
                </TimerButtonItem>
                <TimerButtonItem onClick={handleTimerButtonClick(4)}>
                    Таймер {4} сек
                </TimerButtonItem>
            </TimerButtonLayout>
            <div className="PageLayout_log_container">
                <TimerLogsLayout>
                    {/* https://github.com/microsoft/TypeScript/issues/36390 */}
                    {!!logs.length && (logs as LogType[]).map((log: LogType) => {
                        return (
                            <TimerLogsItem key={log.id} name={log.name} clickTime={log.clickTime} finishTime={log.finishTime} />
                        )
                    })}
                </TimerLogsLayout>
            </div>
        </div>
    )
}

export default App;
