import React from 'react';
import {Result} from 'antd';

const NotAuthorized = (): JSX.Element => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized"
        />);
}

export default NotAuthorized;
