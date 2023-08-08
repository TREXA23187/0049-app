import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import {
    WechatOutlined,
    QqOutlined,
    DingdingOutlined,
    WeiboCircleOutlined,
    FullscreenOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull';
import '@/style/view-style/index.less';
import BarEcharts from './bar.jsx';
import PieEcharts from './pie.jsx';
import LineEcharts from './line.jsx';
import ScatterEcharts from './scatter.jsx';
import PictorialBarEcharts from './pictorialBar.jsx';

const Index = () => {
    const fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'));
        }
    };
    return (
        <Layout className='index animated fadeIn'>
            <div className='base-style base-view'>
                <Row>
                    <Col span={24}>
                        <div className='base-style'>
                            <div className='bar-header'>
                                <div>Statistical Data Display</div>
                                <FullscreenOutlined style={{ cursor: 'pointer' }} onClick={fullToggle} />
                            </div>
                            <Divider />
                            <BarEcharts />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                            <LineEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PieEcharts />
                        </div>
                    </Col>
                    {/* <Col span={12}>
                        <div className='base-style'>
                            <ScatterEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PictorialBarEcharts />
                        </div>
                    </Col> */}
                </Row>
            </div>
        </Layout>
    );
};

export default Index;
