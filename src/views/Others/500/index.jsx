import React from 'react';
import { Button, Result } from 'antd';

const View500 = props => (
    <Result
        status='500'
        title='500'
        subTitle='Sorry, something went wrong.'
        extra={
            <Button type='primary' onClick={() => props.history.push('/index')}>
                Back Home
            </Button>
        }
    />
);

export default View500;
