import React from 'react';
import { Select, Form, Slider, InputNumber } from 'antd';

// const params_dict = [
//     {
//         max_depth: { type: 'range', option: [2, 10] },
//         min_samples_split: { type: 'range', option: [2, 10] },
//         min_samples_leaf: { type: 'range', option: [1, 10] }
//     },
//     {
//         weights: { type: 'select', option: ['uniform', 'distance'] },
//         n_neighbors: { type: 'range', option: [1, 21] },
//         metric: { type: 'select', option: ['euclidean', 'manhattan', 'minkowski'] },
//         algorithm: { type: 'select', option: ['ball_tree', 'kd_tree', 'brute', 'auto'] }
//     },
//     {
//         n_estimators: { type: 'select', option: [10, 50, 100] },
//         max_depth: { type: 'range', option: [2, 10] },
//         min_samples_split: { type: 'range', option: [2, 10] },
//         max_features: { type: 'select', option: ['sqrt', 'log2', 'None'] },
//         min_samples_leaf: { type: 'range', option: [1, 10] }
//     },
//     {
//         hidden_layer_sizes: { type: 'select', option: [100, [100, 100], [100, 100, 100]] },
//         activation: { type: 'select', option: ['logistic', 'tanh', 'relu'] },
//         solver: { type: 'select', option: ['lbfgs', 'sgd', 'adam'] },
//         max_iter: { type: 'select', option: [100, 200, 500, 1000] },
//         alpha: { type: 'select', option: [0.0001, 0.001, 0.01, 0.1] }
//     },
//     {
//         random_state: { type: 'select', option: [] },
//         kernel: { type: 'select', option: ['rbf', 'linear'] },
//         gamma: { type: 'select', option: [1e-3, 1e-4, 'scale', 'auto'] },
//         C: { type: 'select', option: [1, 10, 100, 1000] }
//     }
// ];

export default function HyperParamsItem(props) {
    const { setting } = props;

    return (
        <>
            {Object.keys(setting).map(key => {
                const item = setting[key];
                return (
                    <Form.Item
                        label={key}
                        name={key}
                        key={key}
                        labelCol={{
                            span: 12
                        }}>
                        {item.type === 'range' && <Slider range defaultValue={item.option} min={1} max={50} />}
                        {item.type === 'select' && (
                            <Select
                                mode='tags'
                                style={{
                                    width: '100%'
                                }}
                                options={item.option.map(v => {
                                    return { label: JSON.stringify(v), value: v };
                                })}
                            />
                        )}
                    </Form.Item>
                );
            })}
        </>
    );
}
