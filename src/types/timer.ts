export type TimeoutType = {
    id: string;                                             // Уникальный идентификатор, собирается из name#H:M:S:MS
    name: number | string;                                  // Имя таймаута
    timeout: number;                                        // Время таймаута в мс
    clickTime: string;                                      // Время регистрации (клика) таймаута в формате Date.toLocaleTimeString() => HH:MM:SS
    timeoutId: ReturnType<typeof setTimeout> | null;        // Экземпляр конкретного таймаута. Нужен, чтобы мы могли досрочно завершить setTimeout
}

export type LogType = TimeoutType & {
    finishTime: string                                      // Время окончания таймаута в формате Date.toLocaleTimeString() => HH:MM:SS
}

export type TimerQueueType = {
    queue: TimeoutType[] | [];                              // Очередь элементов таймаута в порядке их вызова
    logs: LogType[] | [];                                   // Очередь логов элементов, выполнивших setTimeout
    pushNewTimeout: (id: number, timeout: number) => void;  // метод добавления нового timeout в очередь
    clearTimer: () => void;                                 // метод очистки очереди и логов, а также завершения всех процессов таймаута
}