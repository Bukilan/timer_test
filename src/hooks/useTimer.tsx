import { useEffect, useState } from 'react';

import { TimerQueueType } from "../types";

type UseTimerReturnType = Omit<TimerQueueType, "queue">

/**
 * @var isQueueAlreadyProcessed - статус обработчика очереди. По дефолту false
 * @var queue - очередь таймаутов на обработку. По дефолту []
 * @var logs - стек завершившихся таймаутов по порядку их вызова. По дефолту []
 *
 * @method startQueueProcess - private Метод обработки очереди.
 * Берет в работу первый по списку элемент очереди, ставит на него setTimeout и записывает timeoutId в элемент очереди.
 * По выполнению setTimeout убирает элемент из очереди, записывает этот элемент в логи и, если в очереди еще остались элементы - запускает себя рекурсивно
 * @method pushNewTimeout - public Метод добавления нового элемента в очередь. Формирует id элемента очереди и ставит время создания
 * @method clearTimer - public Метод удаления существующей очереди, логов и остановка всех отложенный таймаутов
 * @method useEffect - следит за очередью и статусом обработчика очереди.
 * Если очередь поменялась и при этом в обработчик свободен - Запускает обработчик очереди и меняет его статус
 *
 * @return Возвращаем только нужную для UI модель данных.
 */

const useTimer = (): UseTimerReturnType => {
    const [isQueueAlreadyProcessed, setIsQueueAlreadyProcessed] = useState<boolean>(false)
    const [queue, setQueue] = useState<TimerQueueType['queue']>([])
    const [logs, setLogs] = useState<TimerQueueType['logs']>([])

    const startQueueProcess = () => {

        const nextProcessedTimeout = queue[0]

        const timeoutId = setTimeout(() => {

            setLogs(prevState => {
                const newLog = [...prevState]

                newLog.push({
                    ...nextProcessedTimeout,
                    finishTime: new Date().toLocaleTimeString()
                })

                return newLog
            })

            setQueue(prevState => {
                const newQueue = [...prevState]

                newQueue.shift()

                return newQueue
            })

            if (queue.length) {
                setIsQueueAlreadyProcessed(false)
            } else {
                startQueueProcess()
            }

        }, nextProcessedTimeout.timeout)

        setQueue(prevState => {

            const modifiedQueue = [...prevState]
            modifiedQueue.shift()
            modifiedQueue.unshift({
                ...nextProcessedTimeout,
                timeoutId
            })

            return modifiedQueue

        })
    }

    const pushNewTimeout = (id: number, timeout: number) => {
        const createTimestamp = new Date()

        const createdTimer = {
            id: `${id}#${createTimestamp.toLocaleTimeString()}:${createTimestamp.getMilliseconds()}`,
            name: id,
            timeout,
            clickTime: createTimestamp.toLocaleTimeString(),
            timeoutId: null
        }

        setQueue(prevState => {
            const newQueue = [...prevState];

            newQueue.push(createdTimer)

            return newQueue
        })
    }

    const clearTimer = () => {
        queue.forEach(item => {
            if (typeof item.timeoutId === 'number') clearTimeout(item.timeoutId)
        })

        setQueue([])
        setLogs([])
        setIsQueueAlreadyProcessed(false)
    }

    useEffect(() => {
        if (!isQueueAlreadyProcessed && !!queue.length) {
            startQueueProcess()
            setIsQueueAlreadyProcessed(true)
        }
    }, [queue, isQueueAlreadyProcessed])

    return {
        logs,
        pushNewTimeout,
        clearTimer
    }
};

export default useTimer;
