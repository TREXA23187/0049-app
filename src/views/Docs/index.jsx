import React from 'react';
import { Anchor, Layout, Row, Col, Typography, Image } from 'antd';
import Figure_2_1 from './img/figure-2.1.png';
import Figure_2_2 from './img/figure-2.2.png';
import Figure_4_1 from './img/figure-4.1.png';
import Figure_4_2 from './img/figure-4.2.png';
import Figure_5_1 from './img/figure-5.1.png';
import Figure_5_2 from './img/figure-5.2.png';
import Figure_5_3 from './img/figure-5.3.png';
import Figure_5_4 from './img/figure-5.4.png';
import Figure_5_5 from './img/figure-5.5.png';

const anchorItems = [
    {
        key: 'introduction',
        href: '#introduction',
        title: 'Introduction'
    },
    {
        key: 'models',
        href: '#models',
        title: 'Models'
    },
    {
        key: 'templates',
        href: '#templates',
        title: 'Templates'
    },
    {
        key: 'tasks',
        href: '#tasks',
        title: 'Tasks',
        children: [
            {
                key: 'training-task',
                href: '#training-task',
                title: 'Training task'
            },
            {
                key: 'deployment-task',
                href: '#deployment-task',
                title: 'Deployment task'
            }
        ]
    },

    {
        key: 'images',
        href: '#images',
        title: 'Images',
        children: [
            {
                key: 'instances',
                href: '#instances',
                title: 'instances'
            }
        ]
    },
    {
        key: 'appendix',
        href: '#appendix',
        title: 'Appendix',
        children: [
            {
                key: 'editor',
                href: '#editor',
                title: 'Editor'
            },
            {
                key: 'model-template',
                href: '#model-template',
                title: 'Model template'
            }
        ]
    }
];

export default function Docs() {
    const { Content, Sider } = Layout;
    const { Title, Paragraph, Text, Link } = Typography;

    return (
        <Layout>
            <Sider theme='light' width={'15%'}>
                <div style={{ padding: '20px' }}>
                    <Anchor affix={false} items={anchorItems} />
                </div>
            </Sider>
            <Content
                className='site-layout'
                style={{
                    padding: '0 24px',
                    minHeight: 280
                }}>
                <div className='base-style base-view'>
                    <Row style={{ padding: 20 }}>
                        <Col span={20} offset={2}>
                            <Typography>
                                <Title level={2} id='introduction'>
                                    Introduction
                                </Title>
                                <Paragraph>
                                    The project aims to develop a web-based application for the quick deployment of deep
                                    learning models. The goal of the project is to enable users with limited programming
                                    knowledge to easily deploy pre-trained models and use them for various tasks such as
                                    image and text classification, object detection, and more. The webapp will provide a
                                    user-friendly interface for training and evaluating models, as well as building
                                    users' own interface for testing and sharing training model products.
                                </Paragraph>
                                <Paragraph>
                                    The training and evaluation model is the process of automatically training and
                                    evaluating the final model by establishing a training task and creating an image
                                    based on the training task. The training results page of the model can be accessed
                                    through webpage links.
                                </Paragraph>
                                <Paragraph>
                                    In addition, deploy the products of the trained model, so that the public or
                                    designated groups can access a default or user built static page through webpage
                                    links, and put the model training products into practical production activities.
                                </Paragraph>
                                <Title level={2} id='models'>
                                    Models
                                </Title>
                                <Paragraph>
                                    In the model list interface of the console, you can see some machine learning models
                                    and deep learning related models provided by the system to users.
                                </Paragraph>
                                <Image src={Figure_2_1} />
                                <Paragraph>
                                    For those who have requirements for model details or want to use deep learning
                                    models that are not provided by the system by default, they can upload the specified
                                    model to this system by creating a new model. This system provides multiple ways for
                                    users to upload custom models, including uploading model <Text code>.py</Text> files
                                    and uploading through GitHub links. When specifying the github link, it is necessary
                                    to <Text strong>make the github repository as public or upload the token</Text> that
                                    allows the system to access the model code repository together.
                                </Paragraph>
                                <Image src={Figure_2_2} />
                                <Paragraph>
                                    For custom model files, it is necessary to download the specified model template
                                    file and implement each required method.
                                    <Link href='/docs#model-template'> Click to view the details</Link>.
                                </Paragraph>
                                <Title level={2} id='templates'>
                                    Templates
                                </Title>
                                <Paragraph>templates</Paragraph>
                                <Title level={2} id='tasks'>
                                    Tasks
                                </Title>
                                <Paragraph>
                                    Establishing a task is the most important step in ultimately building an image
                                    instance, and subsequent image construction will be completed according to various
                                    instructions in the task module. Firstly, the current types of tasks are divided
                                    into training tasks and deployment tasks.
                                </Paragraph>
                                <Paragraph>
                                    In the task list interface, you can view the user's current generated task list and
                                    detailed information, mainly including task name, task type, and task status. The
                                    task status indicates whether there is currently an image built based on the current
                                    task, and whether the current task is being executed or completed.
                                </Paragraph>
                                <Image src={Figure_4_1} />
                                <Title level={3} id='training-task'>
                                    Training task
                                </Title>
                                <Paragraph>
                                    For creating a new training task, when creating a new task, select the task type as
                                    the training task, and then select a built-in model or an uploaded custom model as
                                    the model to be trained according to the requirements. Uploading a
                                    <Text code>.csv</Text> format dataset and identifying the training label of the
                                    dataset are necessary for the automatic construction and training of the model.
                                </Paragraph>
                                <Image src={Figure_4_2} />
                                <Title level={3} id='deployment-task'>
                                    Deployment task
                                </Title>
                                <Title level={2} id='images'>
                                    Images
                                </Title>
                                <Paragraph>
                                    In the Image and Instance interface, the image list will display the list of images
                                    built by the user based on different tasks, mainly including the repository name,
                                    image tag, image status, and size of the image. The status of the image will be
                                    divided into being built, unused, and in use.
                                </Paragraph>
                                <Image src={Figure_5_1} />
                                <Paragraph>
                                    As for the building of a new image, only the specified task needs to be selected,
                                    and the image to be built will be automatically constructed according to the
                                    attributes and instructions selected in the specified task to complete the task.
                                </Paragraph>
                                <Image src={Figure_5_2} />
                                <Paragraph>
                                    After confirming the image task and clicking the submit button, the image that has
                                    just been given the building command will appear in the image list, and its status
                                    will be `being built`. This process will continue for a period of time until the
                                    <Text strong> Image ID</Text> and <Text strong>Size</Text> of the image are
                                    displayed in the list, indicating that the image has been successfully built.
                                </Paragraph>
                                <Image src={Figure_5_3} />
                                <Title level={3} id='instances'>
                                    Instances
                                </Title>
                                <Paragraph>
                                    Users can create a running instance based on a mirror, and the content of the
                                    instance can be accessed through a webpage link. Depending on the type of task, the
                                    corresponding link to the instance may be a default display of the training and
                                    evaluation model results provided by the system, or a user built interface that
                                    provides practical purposes based on the model training results.
                                </Paragraph>
                                <Image src={Figure_5_4} />

                                <Paragraph>
                                    On the instance details page, users can access the corresponding interface page of
                                    each instance in the browser through the URL link bound to it. At the same time,
                                    users can also control the running status of the instance or generate a shared link
                                    to share with other users on this page.
                                </Paragraph>
                                <Image src={Figure_5_5} />
                                <Title level={2} id='appendix'>
                                    Appendix
                                </Title>
                                <Title level={3} id='editor'>
                                    Editor
                                </Title>
                                <Title level={3} id='model-template'>
                                    Model template
                                </Title>
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}
