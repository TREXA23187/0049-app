import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export default function Template() {
    const history = useHistory();

    return (
        <div>
            {' '}
            <Row>
                <Col span={2}>
                    <Button
                        type='primary'
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                            history.push('/console/template/editor?sider=false');
                        }}>
                        New Template
                    </Button>
                </Col>
            </Row>{' '}
        </div>
    );
}
