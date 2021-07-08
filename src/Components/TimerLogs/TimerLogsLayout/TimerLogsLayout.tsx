import React  from 'react';

import './styles.css'

type Props = {
    children: React.ReactNode[] | React.ReactNode
}

const TimerLogsLayout: React.FunctionComponent<Props> = ({ children }) => {
    const mappedChildren = React.Children.map(children, (child) => {
        return (
            <div className="TimerLogsLayout_item">
                {child}
            </div>
        );
    })

    return (
        <div className="TimerLogsLayout_container">
            {mappedChildren}
        </div>
    )
};

export default TimerLogsLayout;
