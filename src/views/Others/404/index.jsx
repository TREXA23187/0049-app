import React from 'react';
import { Button, Result } from 'antd';

const View404 = props => (
    <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
            <Button type='primary' onClick={() => props.history.push('/index')}>
                Back Home
            </Button>
        }
    />
);

export default View404;
