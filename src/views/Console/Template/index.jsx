import React from 'react';
import { Col, Row, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTemplateList, removeTemplate } from '@/api/console';
import { useRequest } from '@umijs/hooks';
import { useTranslation } from 'react-i18next';
import TemplateCard from './template-card';
import './index.css';

export default function Template() {
    const { t } = useTranslation();
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: templateList, refresh } = useRequest(async () => {
        const res = await getTemplateList();

        return res.data?.list;
    });

    const onCardEdit = data => {
        history.push(`/console/template/editor?sider=false&data=${data.content}`);
    };

    const onCardRemove = async data => {
        const res = await removeTemplate({ id: data.id });
        if (res.code === 0) {
            messageApi.success(res.msg);
            refresh();
        } else {
            messageApi.error(res.msg);
        }
    };

    return (
        <div>
            {contextHolder}
            <Row style={{ marginBottom: '10px' }}>
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
            </Row>

            <Row gutter={12}>
                {templateList?.map((item, index) => {
                    return (
                        <Col span={8} key={index}>
                            <TemplateCard onCardEdit={onCardEdit} onCardRemove={onCardRemove} data={item} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
