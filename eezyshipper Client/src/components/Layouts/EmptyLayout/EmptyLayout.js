import React from 'react';

const EmptyLayout = (props) => {
    console.log(props.children);
    return (
        <div>
            {props?.children}
        </div>
    );
};

export default EmptyLayout;