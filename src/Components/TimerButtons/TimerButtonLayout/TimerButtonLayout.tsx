import React, { ReactNode } from 'react';

import './styles.css'

type Props = {
    children: ReactNode[] | ReactNode;
    clearButton: ReactNode;
}

const TimerButtonLayout: React.FunctionComponent<Props> = ({ children, clearButton }) => {
    const mappedChildren = React.Children.map(children, (child) => {
        return (
            <div className="TimerButtonsLayout_button">
                {child}
            </div>
        );
    })

    return (
        <div className="TimerButtonsLayout_container">
            <div className="TimerButtonsLayout_button_container">
                {mappedChildren}
            </div>
            <div className="TimerButtonsLayout_button TimerButtonsLayout_button_close">
                {clearButton}
            </div>
        </div>
    )
}

export default TimerButtonLayout;
