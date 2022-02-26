import React from 'react';
import GuestTitlebar from '../../Shared/GuestTitlebar/GuestTitlebar';

const EmptyLayout = (props) => {
    return (
        <>
            <GuestTitlebar></GuestTitlebar>
            {props?.children}
        </>
    );
};

export default EmptyLayout;