import React from 'react';
import { Anchor, Layout, Row, Col, Typography, Image, Table } from 'antd';
import Figure_1_1 from './img/figure-1.1.png';
import Figure_2_1 from './img/figure-2.1.png';
import Figure_2_2 from './img/figure-2.2.png';
import Figure_2_3 from './img/figure-2.3.png';
import Figure_2_4 from './img/figure-2.4.png';
import Figure_3_1 from './img/figure-3.1.png';
import Figure_3_2 from './img/figure-3.2.png';
import Figure_3_3 from './img/figure-3.3.png';
import Figure_3_4 from './img/figure-3.4.png';
import Figure_3_5 from './img/figure-3.5.png';
import Figure_4_1 from './img/figure-4.1.png';
import Figure_4_2 from './img/figure-4.2.png';
import Figure_4_3 from './img/figure-4.3.png';
import Figure_5_1 from './img/figure-5.1.png';
import Figure_5_2 from './img/figure-5.2.png';
import Figure_5_3 from './img/figure-5.3.png';
import Figure_5_4 from './img/figure-5.4.png';
import Figure_5_5 from './img/figure-5.5.png';
import Figure_5_6 from './img/figure-5.6.png';
import Figure_5_7 from './img/figure-5.7.png';
import Figure_5_8 from './img/figure-5.8.png';
import './index.css';
import TemplateEditorTable from './template-editor-table';

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
        key: 'templates',
        href: '#templates',
        title: 'Templates',
        children: [
            {
                key: 'template-editor',
                href: '#template-editor',
                title: 'Template Editor'
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
                title: 'instances',
                children: [
                    {
                        key: 'training-task-instance',
                        href: '#training-task-instance',
                        title: 'Training task instance'
                    },
                    {
                        key: 'deployment-task-instance',
                        href: '#deployment-task-instance',
                        title: 'Deployment task instance'
                    }
                ]
            }
        ]
    }
];

export default function Docs() {
    const { Content, Sider } = Layout;
    const { Title, Paragraph, Text, Link } = Typography;

    return (
        <Layout>
            <Sider theme='light' width={'20%'}>
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
                                    This platform provides some commonly used machine learning models for classification
                                    or regression problems by default, and also supports users to upload customized
                                    model files in the specified code format.
                                </Paragraph>
                                <Paragraph>
                                    The training and evaluation model is the process of automatically training and
                                    evaluating the final model by establishing a training task and creating a mirror
                                    containing the code and resources required for the training model based on the
                                    training task. The training results of the model can be displayed to the public in
                                    the form of generating shared links to access a web page, which can be used for
                                    analyzing or predicting activities. In addition, the webpage interface displayed to
                                    the public can also be customized or built based on the scheme provided by the
                                    system.
                                </Paragraph>
                                <Paragraph>
                                    You can enter the <Text strong>Console</Text> interface through the menu in the
                                    upper right corner of the homepage.
                                </Paragraph>
                                <Image src={Figure_1_1} />

                                <Title level={2} id='models'>
                                    Models
                                </Title>
                                <Paragraph>
                                    In the model list interface of the console, you can see some machine learning models
                                    provided by the system to users. These models are divided into two types for solving
                                    <Text strong> classification problems</Text> and
                                    <Text strong> regression problems</Text>. The model files provided by the platform
                                    can be accessed by downloading them locally, in order to analyze and modify the
                                    platform's model source code and establish user-defined model files.
                                </Paragraph>
                                <Image src={Figure_2_1} />
                                <Paragraph>
                                    For those who have requirements for model details or want to use deep learning
                                    models that are not provided by the system by default, they can upload the specified
                                    model to this system by creating a new model. You need to upload the{' '}
                                    <Text code>.py</Text> file of the model and fill in the name and type of the model
                                    to identify usage in different task, including classification and regression tasks.
                                </Paragraph>
                                <Image src={Figure_2_2} />
                                <Paragraph>
                                    In addition, there are some advanced settings options for the model. For example, if
                                    users want to make some choices about the <Text strong>hyper-parameters</Text> of
                                    the model, they can click the <Text code>Add Field</Text> button in the Hyper
                                    Parameters area to increase the selection.
                                </Paragraph>
                                <Image src={Figure_2_3} />
                                <Paragraph>
                                    The types of hyper-parameters mainly include selection on a{' '}
                                    <Text strong>range</Text> and selection on several <Text strong>options</Text>. The
                                    selection on a range indicates that the value of the parameter will be a continuous
                                    range, such as <Text code>[1,20]</Text>. In the model, the performance of the model
                                    will be tested under the conditions of 1, 2, 3...20, respectively. The selection of
                                    options is to limit the possible values for this parameter to a few options provided
                                    by the user, which can be created by entering options in the input area.
                                </Paragraph>
                                <Image src={Figure_2_4} />
                                <Title level={2} id='tasks'>
                                    Tasks
                                </Title>
                                <Paragraph>
                                    Establishing a task is the most important step in ultimately building an image
                                    instance, and subsequent image construction will be completed according to various
                                    instructions in the task module. Firstly, the current types of tasks are divided
                                    into <Text strong>training tasks</Text> and <Text strong>deployment tasks</Text>.
                                </Paragraph>
                                <Paragraph>
                                    In the task list interface, you can view the user's current generated task list and
                                    detailed information, mainly including{' '}
                                    <Text strong>task name, task type, and task status</Text>. The task status indicates
                                    whether there is currently an image built based on the current task, and whether the
                                    current task is being executed or completed,or even failed.
                                </Paragraph>
                                <Image src={Figure_3_1} />
                                <Title level={3} id='training-task'>
                                    Training task
                                </Title>
                                <Paragraph>
                                    The following are the steps for creating a new training task:
                                    <ul>
                                        <li>
                                            <Text>
                                                Input the name of the task and set the type of this task as a training
                                                task.
                                            </Text>
                                        </li>
                                        <li>
                                            <Text>
                                                Then select a built-in model or an uploaded custom model as the model to
                                                be trained.
                                            </Text>
                                        </li>
                                        <li>
                                            <Text>
                                                Uploading a <Text code>.csv</Text> format dataset and identifying the
                                                training label of the dataset are necessary for the automatic
                                                construction and training of the model.
                                                <ul>
                                                    <li>
                                                        You need to select the corresponding target labels in the
                                                        dataset and other data labels required for training, as the data
                                                        you upload may contain meaningless or empty columns.
                                                    </li>
                                                </ul>
                                            </Text>
                                        </li>
                                    </ul>
                                </Paragraph>
                                <Image src={Figure_3_2} />
                                <Paragraph>
                                    After completing the above steps, you can click the submit button to submit the
                                    task. At the same time, you can also further improve the advanced settings section
                                    of this task. This mainly includes the selection and assignment of hyper-parameters,
                                    including the selection items of hyperparameters built-in in the system or set by
                                    the user when building the model.
                                    <ul>
                                        <li>
                                            If the option of the parameter is a <Text strong>slider</Text>, it indicates
                                            that the value of the parameter is the selected value on the range. You can
                                            drag the slider to set the range of its values.
                                        </li>
                                        <li>
                                            If the option for the parameter is a <Text strong>drop-down selection</Text>
                                            , it indicates that the value of the parameter will be selected among
                                            several options or all.
                                        </li>
                                    </ul>
                                </Paragraph>
                                <Image src={Figure_3_3} />
                                <Paragraph>
                                    After a training task is successfully executed, you can view information related to
                                    the task in the task list and download the corresponding model file{' '}
                                    <Text code>(.pickle)</Text>
                                    after training.
                                </Paragraph>
                                <Image src={Figure_3_4} />
                                <Paragraph style={{ marginTop: '10px' }}>
                                    Before reading the tutorials related to deployment tasks, you can{' '}
                                    <Link href='#images'>click here </Link>to read how to execute the training tasks
                                    established above.
                                </Paragraph>
                                <Title level={3} id='deployment-task'>
                                    Deployment task
                                </Title>
                                <Paragraph>
                                    The following are the steps for creating a new deployment task:
                                    <ul>
                                        <li>
                                            <Text>
                                                Input the name of the task and set the type of this task as a deployment
                                                task.
                                            </Text>
                                        </li>
                                        <li>
                                            <Text>
                                                Select a template as the interface for display after deployment.
                                            </Text>
                                        </li>
                                        <li>
                                            <Text>
                                                Select a trained model file as the base model that provides analysis and
                                                prediction functionalities. (The file does not need to be downloaded by
                                                the user in the task details interface since files will be automatically
                                                stored after the model is successfully trained.)
                                            </Text>
                                        </li>
                                    </ul>
                                </Paragraph>
                                <Image src={Figure_3_5} />
                                <Title level={2} id='templates'>
                                    Templates
                                </Title>
                                <Paragraph>
                                    When your model is successfully trained and you want to share and use the results of
                                    the model training with others, you may need a interface for display in public,
                                    where other users can interact with the webpage and the data input by other users
                                    can be verified or predicted. So templates are pages used to display to users and
                                    interact with model data when establishing deployment tasks.
                                </Paragraph>
                                <Image src={Figure_4_1} />
                                <Paragraph>
                                    When creating a new template:
                                    <ul>
                                        <li>
                                            You can choose to build your own interface on top of the blank template.
                                        </li>
                                        <li>
                                            You can also create a template prototype that includes data input and
                                            interaction buttons based on the training dataset and the required data
                                            structure in the existing training task data, making it convenient for users
                                            to use or modify it directly.
                                        </li>
                                    </ul>
                                </Paragraph>
                                <Image src={Figure_4_2} />
                                <Paragraph>
                                    When generating templates based on training task data, a series of labels and input
                                    fields can be seen on the template edit page, which are used to accept user input
                                    data. The submit button sends the user's input data to the model for processing, and
                                    the processed analysis or prediction results will be displayed in the Result area.
                                </Paragraph>
                                <Image src={Figure_4_3} />
                                <Paragraph>
                                    <Text strong>
                                        Don't forget to click the save button after confirming the template interface.
                                    </Text>
                                    At the same time, you can learn more about the information of various component
                                    elements in the template editing interface, as well as the corresponding attributes
                                    and event in the editor tutorial.
                                </Paragraph>
                                <Title level={3} id='template-editor'>
                                    Template Editor
                                </Title>
                                <Paragraph>
                                    <TemplateEditorTable />
                                </Paragraph>
                                <Title level={2} id='images'>
                                    Images
                                </Title>
                                <Paragraph>
                                    In the Image and Instance interface, the image list will display the list of images
                                    built by the user based on different tasks, mainly including the repository name,
                                    image tag, image status, and size of the image. The status of the image will be
                                    divided into <Text strong>being built, unused, and in use</Text>. Building image is
                                    the process of packaging the resources and code required for execution into an
                                    image, based on the parameters and specifications set by the user in the task
                                    details, in order to wait for the specified initiation of execution of task.
                                </Paragraph>
                                <Image src={Figure_5_1} />
                                <Paragraph>
                                    As for the building of a new image, only the specified task needs to be selected,
                                    and the image to be built will be automatically constructed according to the
                                    attributes and instructions selected in the specified task to complete the task.
                                    <Text code>Tag</Text> is used for images with the same repository name, which can be
                                    used as a version information or update related identifier, which is latest by
                                    default.
                                </Paragraph>
                                <Image src={Figure_5_2} />
                                <Paragraph>
                                    After confirming the image task and clicking the submit button, the image that has
                                    just been given the building command will appear in the image list, and its status
                                    will be <Text code>being built</Text>. This process will continue for a period of
                                    time until the
                                    <Text code>Image ID</Text> and <Text code>Size</Text> of the image are displayed in
                                    the list, indicating that the image has been successfully built. At this stage, the
                                    tasks included in the image and the instructions to start executing are ready to be
                                    accepted.
                                </Paragraph>
                                <Image src={Figure_5_3} />
                                <Title level={3} id='instances'>
                                    Instances
                                </Title>
                                <Paragraph>
                                    Users can create a running instance based on an image, and the content of the
                                    instance can be accessed through a webpage link depending on the type of task.
                                    <ul>
                                        <li>
                                            If the corresponding task in the image is a{' '}
                                            <Text strong>training task</Text>, the page will be a default interface of
                                            the training and evaluation model results provided by the system.
                                        </li>
                                        <li>
                                            If the corresponding task in the image is a{' '}
                                            <Text strong>deployment task</Text>, the interface built by user that
                                            provides practical purposes based on the model training result will be
                                            displayed.
                                        </li>
                                    </ul>
                                </Paragraph>
                                <Image src={Figure_5_4} />
                                <Paragraph>
                                    On the instance details page, users can access the corresponding interface page of
                                    each instance in the browser through the URL link bound to it. At the same time,
                                    users can also control the running status of the instance or generate a shared link
                                    to share with other users on this page.
                                </Paragraph>
                                <Image src={Figure_5_5} />
                                <Title level={4} id='training-task-instance'>
                                    Training Task Instance
                                </Title>
                                <Paragraph>
                                    If you are running an instance that is executing a training task, you can copy the
                                    URL link in the instance details list, which will point to a public independent page
                                    that will contain a series of information and results related to model training. You
                                    can also control the stopping and rerunning of the instance on this interface.
                                </Paragraph>
                                <Image src={Figure_5_6} />
                                <Paragraph>
                                    If the instance is running normally or has an exception, the corresponding task
                                    status in the task list may change from pending to completed or failed. When there
                                    is an exception during task execution, you can view the instance running log or
                                    contact the platform administrator to check.
                                </Paragraph>
                                <Image src={Figure_5_7} />
                                <Title level={4} id='deployment-task-instance'>
                                    Deployment Task Instance
                                </Title>
                                <Paragraph>
                                    If you are running an instance of a deployment task, the platform will not directly
                                    assign you a link as an access link. You need to manually generate a specific link
                                    in the instance's details interface, which will involve whether your model's
                                    practical interface is fully open to the public or whether you need access links
                                    with secret token, only shared with other users you specify for access. If the link
                                    is private, please note that access is within the validity period of the link.
                                </Paragraph>
                                <Paragraph>
                                    <blockquote>
                                        <Text strong>Autofill the Submit URL: </Text>After the instance of the
                                        deployment task is successfully created, the URL of the instance will be
                                        automatically bound to the click event of the submit button in the instance
                                        template.
                                    </blockquote>
                                </Paragraph>
                                <Image src={Figure_5_8} />
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}
