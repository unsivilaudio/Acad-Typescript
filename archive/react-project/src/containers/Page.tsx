import React from 'react';
import classes from '../styles/containers/Page.module.scss';

const Page: React.FC<{ children: any }> = ({ children }) => {
    return (
        <div className={classes.Page}>
            <div className={classes.Content}>{children}</div>
        </div>
    );
};

export default Page;
